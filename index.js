const express = require('express');

const router = express.Router();
router.get(
    '/home',
    (req, res)=> res.send('<h1>welcome</h1>')
)



module.exports = router;

console.log('line 20');