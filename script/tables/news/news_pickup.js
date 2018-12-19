module.exports = {
  TableName : "news_pickup",
  KeySchema: [
      { AttributeName: "news_id", KeyType: "HASH"},
      { AttributeName: "pickup", KeyType: "RANGE"}
  ],
  AttributeDefinitions: [
      { AttributeName: "news_id", AttributeType: "N" },
      { AttributeName: "pickup", AttributeType: "N" }
  ],
  ProvisionedThroughput: {       
      ReadCapacityUnits: 5, // 1項目550文字(title:150文字 description:300文字　その他:100文字) * 10項目 * 3回/秒 = 16.5KB
      WriteCapacityUnits: 1
  }
}
