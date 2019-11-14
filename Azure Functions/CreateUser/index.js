module.exports = async function (context, req) {
    var timeStamp = new Date().toISOString();
    context.log('JavaScript HTTP trigger function processed a request at ' + timeStamp);

    const { id, hash, name, username, bio, creationDate } = req.body;

    if (req.body.id && req.body.hash && req.body.name && req.body.username && req.body.bio && req.body.creationDate) {
        context.bindings.table = {
            id: id,
            hash: hash,
            name: name,
            username: username,
            bio: bio,
            followingCount: "0",
            followerCount: "0",
            followings: [],
            followers: [],
            creationDate: creationDate
        };
        context.res = {
            status: 200, /* Defaults to 200 */
            body: (req.body.username) + "'s account has been created",
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name and id in the request body"
        };
    }
};
