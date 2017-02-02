var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var request = require("request");

router.get('/', function(req, res, next) {
    res.send("Explicit grant verification with authorization code");
});

router.post('/facebook', function(req, res) {
    console.log("FB Authorization Code");

    let authcode = req.body.authorizationcode;
    let appId = "1850441521898312";
    let appSecret = "fa348c462e8e6f7ff9c109b7f47499fd";
    let appUri = "http://localhost:4200/";

    if(authcode) {
        //Check whether it's a token for our app
        let url = "https://graph.facebook.com/oauth/access_token?grant_type=authorization_code&redirect_uri=" + appUri + "&client_id=" + appId + "&client_secret=" + appSecret + "&code=" + authcode;
        request(url, function(error, response, body) {
            if(!error && response.statusCode === 200) {
                //Not a JSON response for some reason

                let tokenString = body.split("&").filter((s) => {return s.indexOf("access_token=") != -1})[0];
                if(tokenString) {
                    let accesstoken = tokenString.substr(13);
                    // Fetch some user data with this
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
                            console.error("Explicit Grant: User data failed (" + response.statusCode + "), sending 401");
                            res.status(401).send({error: "Invalid user"});
                        }
                    });
                }
                else {
                    console.error("Explicit Grant: Token verification returned invalid data, sending 401");
                    console.log(tokenStatus);
                    res.status(401).send({error: "Invalid authorization code"});
                }
            }
            else {
                console.error("Explicit Grant: Token exchange failed (" + response.statusCode + "), sending 401")
                console.log(body);
                res.status(401).send({error: "Invalid authorization code"});
            }
        });
    }
    else {
        console.log("Explicit Grant: invalid FB authorization code, sending 401");
        res.status(401).send({error: "Invalid authorization code"});
    }
});

module.exports = router;