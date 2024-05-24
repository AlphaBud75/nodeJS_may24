const express = require('express');

const app = express();



// Routes
app.use(
    '/' , require('./index')
);


app.listen(
    3100,
    console.log('express running on 3100 port')
);



console.log('app.js line 10');