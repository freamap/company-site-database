module.exports = {
  TableName : "recruit",
  KeySchema: [
    { AttributeName: "recruit_id", KeyType: "HASH"}
  ],
  AttributeDefinitions: [
    { AttributeName: "recruit_id", AttributeType: "N" },
    { AttributeName: "status", AttributeType: "N" },
    { AttributeName: "update", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1, // 1項目200文字 * 10項目 * 1回/秒 = 2KB
    WriteCapacityUnits: 1 // 1項目200文字 * 10項目 * 1回/秒 = 2KB
  },
  GlobalSecondaryIndexes: [
    {
      IndexName: "SortUpdateIndex",
      KeySchema: [
        {
          AttributeName: "status",
          KeyType: "HASH"
        },
        {
          AttributeName: "update",
          KeyType: "RANGE"
        }
      ],
      Projection: {
        ProjectionType: "ALL"
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 1, // 1項目200文字 * 10項目 * 1回/秒 = 2KB
        WriteCapacityUnits: 1
      }
    }
  ]
}
