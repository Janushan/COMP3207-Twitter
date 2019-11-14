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
      "route": "users/create"
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
      "collectionName": "users",
      "createIfNotExists": false,
      "connectionStringSetting": "comp3207-twitter-janu_DOCUMENTDB",
      "direction": "out"
    }
  ],
  "disabled": false
}
