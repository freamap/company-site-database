module.exports = {
  TableName : "news_detail",
  KeySchema: [
      { AttributeName: "news_id", KeyType: "HASH"},
      { AttributeName: "page", KeyType: "RANGE"}
  ],
  AttributeDefinitions: [
      { AttributeName: "news_id", AttributeType: "N" },
      { AttributeName: "page", AttributeType: "N" }
  ],
  ProvisionedThroughput: {       
      ReadCapacityUnits: 4, //  1項目3100文字(コンテンツ:3000文字 その他:100文字) * 4回 = 12.4KB
      WriteCapacityUnits: 1 // 1項目3100文字(コンテンツ:3000文字 その他:100文字) * 1回 = 3.1KB
  }
}
