module.exports = {
  TableName : "news",
  KeySchema: [
    { AttributeName: "news_id", KeyType: "HASH"}
  ],
  AttributeDefinitions: [
    { AttributeName: "news_id", AttributeType: "N" },
    { AttributeName: "pickup", AttributeType: "N" },
    { AttributeName: "create", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 3, // 1項目550文字(title:150文字 description:300文字　その他:100文字) * 10項目 * 3回/秒 = 16.5KB
    WriteCapacityUnits: 1
  },
  GlobalSecondaryIndexes: [
    {
      IndexName: "PickupSortCreateIndex",
      KeySchema: [
        {
          AttributeName: "pickup",
          KeyType: "HASH"
        },
        {
          AttributeName: "create",
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
