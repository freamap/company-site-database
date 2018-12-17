var AWS = require("aws-sdk");
var fs = require("fs");

const region = process.env.AWS_DEFAULT_REGION || 'ap-northeast-1'
const endpoint = process.env.HOST || 'http://localhost:8000'
const access_key_id = process.env.AWS_ACCESS_KEY_ID || '123456789'
const secret_access_key_id = process.env.AWS_SECRET_ACCESS_KEY_ID || ''

AWS.config.update({
  region: region,
  endpoint: endpoint,
  accessKeyId: access_key_id,
  accessKeyId: secret_access_key_id
});

var dynamoDb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

function getTableKeySchema(tableName) {
  return new Promise((resolve, reject) => {
    dynamoDb.describeTable({TableName: tableName}, function(err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data.Table.KeySchema)
      }
    })
  })
}

function deleteTableItems(tableName, deleteItems) {
  let requestArray = []
  deleteItems.forEach(deleteItem => {
    requestArray.push(
      {
        DeleteRequest: {
          Key: deleteItem
        }
      }
    )
  }) 

  return new Promise((resolve, reject) => {
    let requestItems = {}
    requestItems[tableName] = requestArray

    docClient.batchWrite({RequestItems: requestItems}, function(err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data.Items)
      }
    })
  })
}

function getTableItems(tableName, keys) {
  let keysStr = ""
  keys.forEach(key => {
    keysStr += "," + key
  })
  keysStr = keysStr.slice(1)
  return new Promise((resolve, reject) => {
    docClient.scan({TableName: tableName, ProjectionExpression: keysStr}, function(err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data.Items)
      }
    })
  })
}

function putTableItems(tableName) {
  return new Promise((resolve, reject) => {
    let items = JSON.parse(fs.readFileSync("script/data/" + tableName + ".json", 'utf8'));
    let requestArray = []

    items.forEach((item) => {
      requestArray.push(
        {
          PutRequest: {
            Item: item
          }
        }
      )
    })

    let requestItem = {}
    requestItem[tableName] = requestArray
    docClient.batchWrite({RequestItems: requestItem},  function(err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data.Items)
      }
    })
  })
}

async function putData(tableName) {
  let tableKeySchema = await getTableKeySchema(tableName)

  let keys =[]
  tableKeySchema.forEach(key => {
    keys.push(key.AttributeName)
  })

  let tableItems = await getTableItems(tableName, keys)
  if (tableItems.length) {
    await deleteTableItems(tableName, tableItems)
  }

  await putTableItems(tableName)

  return true
}

function insertData(tableName) {
  putData(tableName).then(() => {
    console.log("Insert data to " + tableName + " table success")
  }).catch(err => {
    console.log("Insert data to " + tableName + " table fail")
    console.log(err)
  })
}


// insert data
let tables = 
[
  "news"
]

tables.forEach(table => {
  insertData(table)
})
