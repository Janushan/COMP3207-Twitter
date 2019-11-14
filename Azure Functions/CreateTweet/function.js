{
  "bindings": [
    {
      "authLevel": "function",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": [
        "post"
      ],
      "route": "tweets/create"
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
      "createIfNotExists": false,
      "connectionStringSetting": "comp3207-twitter-janu_DOCUMENTDB",
      "direction": "out"
    }
  ],
  "disabled": false
}
