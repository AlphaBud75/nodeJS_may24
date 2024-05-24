const http = require('http');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
    console.log(
        req.url,
        req.method,
        req.rawHeaders
    );
})
    .listen(3200);

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
            console.log(
                parse(body)
            );
            res.end('ok');
        });
    }
)