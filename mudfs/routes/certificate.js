const express = require('express');
let router = express.Router();
let fs = require('fs')

router.get('/', function(req, res, next) {
    console.log("Looking for my certificate")
    cert = fs.readFileSync('certs/server.pem')    
    res.setHeader('Content-Type', 'application/x-pem-file')
    res.send(cert)
});

module.exports = router


