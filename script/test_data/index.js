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
var docClient = new AWS.DynamoDB.DocumentClient({"convertEmptyValues": true});

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

function putTableItems(tableName, folder) {
  return new Promise((resolve, reject) => {
    let items = JSON.parse(fs.readFileSync("script/data/" + folder + "/" + tableName + ".json", 'utf8'));
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

async function putData(folder, tableName) {
  let tableKeySchema = await getTableKeySchema(tableName)

  let keys =[]
  tableKeySchema.forEach(key => {
    keys.push(key.AttributeName)
  })

  await putTableItems(tableName, folder)

  return true
}

function insertData(folder, tableName) {
  putData(folder, tableName).then(() => {
    console.log("Insert data to " + tableName + " table success")
  }).catch(err => {
    console.log("Insert data to " + tableName + " table fail")
    console.log(err)
  })
}


// insert data
let tables = require("../config/tables.js")

tables.forEach(table => {
  insertData(table[0], table[1])
})
