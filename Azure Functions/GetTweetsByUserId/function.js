{
  "bindings": [
    {
      "authLevel": "function",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": [
        "get"
      ],
      "route": "users/{userId}/tweets"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    },
    {
      "type": "cosmosDB",
      "name": "table",
      "databaseName": "comp3207-janu",
      "collectionName": "tweets",
      "connectionStringSetting": "comp3207-twitter-janu_DOCUMENTDB",
      "direction": "in",
      "sqlQuery": "SELECT * FROM c WHERE c.userId = {userId} ORDER BY c.creationDate DESC",
      "partitionKey": "userId"
    }
  ],
  "disabled": false
}
