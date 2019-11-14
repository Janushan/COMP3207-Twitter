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
      "route": "users/{id}"
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
      "connectionStringSetting": "comp3207-twitter-janu_DOCUMENTDB",
      "direction": "in",
      "sqlQuery": "SELECT * FROM c WHERE c.id = {id}"
    }
  ],
  "disabled": false
}
