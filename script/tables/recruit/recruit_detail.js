module.exports = {
  TableName : "recruit_detail",
  KeySchema: [
    { AttributeName: "recruit_id", KeyType: "HASH"}
  ],
  AttributeDefinitions: [
    { AttributeName: "recruit_id", AttributeType: "N" }
  ],
  ProvisionedThroughput: {       
    ReadCapacityUnits: 1, // 1項目600文字(content:300文字 skills:200文字　その他:100文字) * 1項目 * 3回/秒 = 1.8KB
    WriteCapacityUnits: 1
  }
}
