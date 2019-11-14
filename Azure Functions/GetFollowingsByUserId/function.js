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
      "route": "users/{id}/followings"
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
      "sqlQuery": "SELECT c.followings FROM c WHERE c.id = {id}",
      "direction": "in"
    }
  ],
  "disabled": false
}
