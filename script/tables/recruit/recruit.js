module.exports = {
  TableName : "recruit",
  KeySchema: [
    { AttributeName: "recruit_id", KeyType: "HASH"}
  ],
  AttributeDefinitions: [
    { AttributeName: "recruit_id", AttributeType: "N" },
    { AttributeName: "status", AttributeType: "N" },
    { AttributeName: "order", AttributeType: "N" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1, // 1項目200文字 * 10項目 * 1回/秒 = 2KB
    WriteCapacityUnits: 1 // 1項目200文字 * 10項目 * 1回/秒 = 2KB
  },
  GlobalSecondaryIndexes: [
    {
      IndexName: "SortOrderIndex",
      KeySchema: [
        {
          AttributeName: "status",
          KeyType: "HASH"
        },
        {
          AttributeName: "order",
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
