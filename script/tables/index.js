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

var createTable = (params, tableName) => {
  dynamodb.createTable(params, () => {
    return (err, data) => {
      if (err) {
          console.error("Unable to create table:" + tableName + ". Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("Created table:" + tableName + ". Table description JSON:", JSON.stringify(data, null, 2));
      }
    }
  });
}

var makeTables = () => {
  getTables().then(tableNames => {
    createTables(tableNames)
  }).catch(err => {
    console.log(err)
  })
}

// table作成
var createTables = (tableNames) => {
  // table追加スクリプト
  if (tableNames.indexOf("news") === -1) {
    let news = require("./news/news.js")
    createTable(news, "news")
  }

  if (tableNames.indexOf("news_detail") === -1) {
    let news = require("./news/news_detail.js")
    createTable(news, "news_detail")
  }

  if (tableNames.indexOf("news_pickup") === -1) {
    let news = require("./news/news_pickup.js")
    createTable(news, "news_pickup")
  }
}

makeTables();
