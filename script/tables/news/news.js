module.exports = {
  TableName : "news",
  KeySchema: [
      { AttributeName: "news_id", KeyType: "HASH"}
  ],
  AttributeDefinitions: [
      { AttributeName: "news_id", AttributeType: "N" }
  ],
  ProvisionedThroughput: {       
      ReadCapacityUnits: 4, // 1項目500文字(title:100文字 description:300文字　その他:100文字) * 10項目 * 3回/秒 = 15KB
      WriteCapacityUnits: 1
  }
}
