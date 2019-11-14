module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request at ' + new Date().toISOString());

    const { id, userId, userName, userUsername, content, creationDate } = req.body;

    if (req.body.id && req.body.userId && req.body.userUsername && req.body.content) {
        // context.bindings.table = JSON.stringify({
        //     id: 1,
        //     userId: 1,
        //     userUsername: "janu",
        //     content: "hahaha",
        //     creationDate: "timeStamp"
        // });
        context.bindings.table = {
            id: id,
            userId: userId,
            userName: userName,
            userUsername: userUsername,
            content: content,
            creationDate: creationDate
        };
        context.res = {
            status: 200, /* Defaults to 200 */
            body: "Tweet Created",
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass the complete data on the query string or in the request body"
        };
    }
};
