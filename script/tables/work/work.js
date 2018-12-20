module.exports = {
  TableName : "work",
  KeySchema: [
    { AttributeName: "order", KeyType: "HASH"}
  ],
  AttributeDefinitions: [
    { AttributeName: "order", AttributeType: "N" }
  ],
  ProvisionedThroughput: {       
    ReadCapacityUnits: 1, // 1項目550文字(title:150文字 description:300文字　その他:100文字) * 10項目 * 3回/秒 = 16.5KB
    WriteCapacityUnits: 1
  }
}
