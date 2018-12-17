module.exports = {
  TableName : "news",
  KeySchema: [
      { AttributeName: "id", KeyType: "HASH"}
  ],
  AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "N" }
  ],
  ProvisionedThroughput: {       
      ReadCapacityUnits: 10, 
      WriteCapacityUnits: 10
  }
}
