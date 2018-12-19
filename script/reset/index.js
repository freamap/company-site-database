var AWS = require("aws-sdk");
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

var dynamodb = new AWS.DynamoDB()

var getTables = () => {
  return new Promise((resolve, reject) => {
    dynamodb.listTables({}, function(err, data) {
      if (err) {
        reject(err) 
      } else {
        resolve(data.TableNames)
      }
    })
  })
}

var deleteTables = (tableNames) => {
  tableNames.forEach(tableName => {
    let params = {
      TableName : tableName
    }

    dynamodb.deleteTable(params, function(err, data) {
      if (err) {
          console.error("Unable to delete " + tableName + " table. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("Deleted " + tableName + " table. Table description JSON:", JSON.stringify(data, null, 2));
      }
    });
  
  });
}

getTables().then(tableNames => {
  deleteTables(tableNames)
}).catch(err => {
  console.log(err)
})
