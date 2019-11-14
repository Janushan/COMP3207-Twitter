module.exports = async function (context, req, table) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (!req.query['username']) {
        context.log('Missing username');
        context.res = {
            status: 404,
            body: { error: 'No username specified in the query string.' }
        };
    }

    if (!table) {
        context.log('Username NOT found');
        context.res = {
            status: 400,
            body: { error: 'No data found for username: ' + req.query.username }
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
