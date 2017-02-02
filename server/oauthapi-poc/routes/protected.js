var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
    //TODO implement
    let header = req.get("Authorization");
    if(header.indexOf("Bearer ") != -1) {
        let rawToken = header.substr(7)
        try {
            let jwtToken = jwt.verify(rawToken, "SuperSecret");
            console.log("Verified JWT Token for " + jwtToken.username);
            res.status(200).send("Access granted to " + jwtToken.username);
        }
        catch(e) {
            console.error("Failed to verify JWT Token");
            res.status(401).send("Invalid JWT Token");
        }
    }
    else {
        //TODO implement
    }



    //let token = jwt.verify()
});

module.exports = router;
