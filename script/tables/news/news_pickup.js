module.exports = {
  TableName : "news_pickup",
  KeySchema: [
    { AttributeName: "create", KeyType: "HASH"},
    { AttributeName: "news_id", KeyType: "RANGE"}
  ],
  AttributeDefinitions: [
    { AttributeName: "create", AttributeType: "S" },
    { AttributeName: "news_id", AttributeType: "N" }
  ],
  ProvisionedThroughput: {       
    ReadCapacityUnits: 5, // 1項目550文字(title:150文字 description:300文字 その他:100文字) * 10項目 * 3回/秒 = 16.5KB
    WriteCapacityUnits: 1
  }
}
