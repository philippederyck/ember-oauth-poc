var express = require('express');
var router = express.Router();
var jwt = require('jwt-express');

router.get('/', function(req, res, next) {
    res.send("Authentication with username / password");
});

router.post('/login', function(req, res) {
    console.log("Credentials: login request");

    let username = req.body.username;
    let password = req.body.password;
    
    //Simply check we have both username and password
    if(username && password) {
        console.log("Credentials: valid username and password, generating token");
        //TODO implement
        let data = {
            jwt: jwt.create("SuperSecret", {username: username})
        }
        res.status(200).send(data);
    }
    else {
        console.log("Credentials: invalid username and password, sending 401");
        res.status(401).send({error: "Invalid credentials"});
    }
});

module.exports = router;
