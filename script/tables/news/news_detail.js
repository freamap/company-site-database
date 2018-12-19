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
      ReadCapacityUnits: 5, //  1項目6250文字(コンテンツ:6000文字 タイトル:150文字 その他:100文字) * 4回/秒 = 25KB
      WriteCapacityUnits: 2 // 1項目6250文字(コンテンツ:6000文字 タイトル:150文字 その他:100文字) * 1回/秒 = 6.25KB
  }
}
