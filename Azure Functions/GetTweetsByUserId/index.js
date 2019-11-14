module.exports = async function (context, req, table) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // var userId = req.query.userId;

    if (!req.query['userId']) {
        context.log('Missing user ID');
        context.res = {
            status: 404,
            body: { error: 'No user id specified in the query string.' }
        };
    }

    if (!table) {
        context.log('User NOT found');
        context.res = {
            status: 400,
            body: { error: 'No data found for user id: ' + req.query.userId }
        };
    }
    else if (req.query && table) {
        const jsonResponse = JSON.stringify(table);

        context.res = {
            status: 200, /* Defaults to 200 */
            body: jsonResponse,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
    else {
        context.res = {
            status: 400,
            body: { error: "Please pass a name on the query string or in the request body" }
        };
    }
};
