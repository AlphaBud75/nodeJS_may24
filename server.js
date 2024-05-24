const http = require('http');
const { parse } = require('querystring');
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://new_user_31:OMWzdkHXxn6A0eL1@cluster0-apr12.p6voxqk.mongodb.net/";

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

const client = new MongoClient(uri);
const mongodb_connect = async () => {
    console.log('mongodb_connect()');
    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    }
}
// mongodb_connect();

const server = http.createServer((req, res) => {
    // console.log(
    //     req.url,
    //     req.method,
    //     req.rawHeaders
    // );
}).listen(3200);
console.log('server.js is running');

// GET handler
// server.on(
//     'request', (req, res) => {
//         if (req.method == 'GET') {
//             res.end(JSON.stringify({
//                 data: 'GET method line 25'
//             }))
//         }
//     }
// )


// POST handler

server.on(
    'request', (req, res) => {
        // if(req.method=='POST') {
        //     console.log(req);
        //     res.end(JSON.stringify({
        //         data: 'POST method line 35'
        //     }))
        // }
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log(body);

            findOneListingByName(client, 'sample_mflix', 'comments', body.key_name, body.query_value)
                .then(
                    (resolved, rejected) => {
                        console.log(resolved);
                        res.end(JSON.stringify(resolved))
                    }
                )
                .catch(
                    (resolved, rejected) => {
                        res.end(rejected)
                    }
                )

        });
    }
)

async function findOneListingByName(db_client_object, db_name, collection_name, key_name, query_value) {

    try {
        await client.connect();

        let databasesList = await client.db(db_name).collections();
        console.log(databasesList);

        // .admin().
        // .listDatabases();
        // console.log("Databases:");
        // databasesList.databases.forEach(db => console.log(` - ${db.name}`));

        const result = await db_client_object
            .db(db_name)

            .collection(collection_name)
            .findOne({ key_name: query_value });

        if (result) {
            console.log(`Found a listing in the collection with the key: ${key_name}: '${query_value}':`);
            // console.log(result);
            return result
        } else {
            console.log(`No listings found with the key:" ${key_name} ": '${query_value}'`);
        }

    } catch (e) {
        console.log(e.error);
    }
}


// await findOneListingByName(client, 'sample_mflix', 'comments', 'name', 'Taylor Scott')