module.exports = {
  TableName : "work_detail",
  KeySchema: [
    { AttributeName: "work_id", KeyType: "HASH"},
    { AttributeName: "page", KeyType: "RANGE"}
  ],
  AttributeDefinitions: [
    { AttributeName: "work_id", AttributeType: "N" },
    { AttributeName: "page", AttributeType: "N" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 7, //  1項目6250文字(コンテンツ:6000文字 タイトル:150文字 description:300文字 その他:100文字) * 4回/秒 = 26.5KB
    WriteCapacityUnits: 2 // 1項目6250文字(コンテンツ:6000文字 タイトル:150文字 description:300文字 その他:100文字) * 1回/秒 = 6.55KB
  }
}
