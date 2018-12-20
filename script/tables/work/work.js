module.exports = {
  TableName : "work",
  KeySchema: [
    { AttributeName: "work_id", KeyType: "HASH"}
  ],
  AttributeDefinitions: [
    { AttributeName: "work_id", AttributeType: "N" },
    { AttributeName: "status", AttributeType: "N" },
    { AttributeName: "order", AttributeType: "N" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 3, // 1項目550文字(title:150文字 description:300文字　その他:100文字) * 10項目 * 3回/秒 = 16.5KB
    WriteCapacityUnits: 1
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
        ReadCapacityUnits: 3, // 1項目550文字(title:150文字 description:300文字　その他:100文字) * 10項目 * 3回/秒 = 16.5KB
        WriteCapacityUnits: 1
      }
    }
  ]
}
