var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var request = require("request");

router.get('/', function(req, res, next) {
    res.send("Implicit grant verification with access token");
});

router.post('/facebook', function(req, res) {
    console.log("FB Access Token");

    let accesstoken = req.body.accesstoken;
    let appId = "1850441521898312";

    if(accesstoken) {
        //Check whether it's a token for our app
        let url = "https://graph.facebook.com/debug_token?input_token=" + accesstoken + "&access_token=" + accesstoken;
        request(url, function(error, response, body) {
           if(!error && response.statusCode === 200) {
               let tokenStatus = JSON.parse(body);
               if(tokenStatus.data && tokenStatus.data.app_id === appId) {
                   // The token was issued for our app, fetch some user data with this
                   let userUrl = "https://graph.facebook.com/v2.8/me?access_token=" + accesstoken;
                   request(userUrl, function(error, response, body) {
                       if(!error && response.statusCode === 200) {
                           console.log("Retrieved user data from Facebook");
                           let userData = JSON.parse(body);

                           let payload = {
                               username: userData.name
                           };

                           let data = {
                               payload: payload,
                               jwt: jwt.sign(payload, "SuperSecret")
                           };

                           res.status(200).send(data);
                       }
                       else {
                           console.error("Implicit Grant: User data failed (" + response.statusCode + "), sending 401");
                           res.status(401).send({error: "Invalid user"});
                       }
                   });
               }
               else {
                   console.error("Implicit Grant: Token verification returned invalid data, sending 401");
                   console.log(tokenStatus);
                   res.status(401).send({error: "Invalid token"});
               }
           }
           else {
               console.error("Implicit Grant: Token verification failed (" + response.statusCode + "), sending 401");
               res.status(401).send({error: "Invalid token"});
           }
        });
    }
    else {
        console.log("Implicit Grant: invalid FB access token, sending 401");
        res.status(401).send({error: "Invalid token"});
    }
});

module.exports = router;
