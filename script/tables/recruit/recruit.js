module.exports = {
  TableName : "recruit",
  KeySchema: [
    { AttributeName: "update", KeyType: "HASH"},
    { AttributeName: "recruit_id", KeyType: "RANGE"}
  ],
  AttributeDefinitions: [
    { AttributeName: "update", AttributeType: "S" },
    { AttributeName: "recruit_id", AttributeType: "N" }
  ],
  ProvisionedThroughput: {       
    ReadCapacityUnits: 1, // 1項目200文字 * 10項目 * 1回/秒 = 2KB
    WriteCapacityUnits: 1 // 1項目200文字 * 10項目 * 1回/秒 = 2KB
  }
}
