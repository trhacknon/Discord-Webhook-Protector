const express = require('express'),
totp = require("totp-generator"),
axios = require('axios');

const webhook = "" //your webhook
const pass32 = "K4ZVUQTSIRMDOWKRGU2WQQTZJM======" //a key encoded in base32, see https://github.com/bellstrand/totp-generator#how-to-use for more
const port = process.env.PORT || 3000; //port

function denied(res) {
    res.status(403);
    res.send('fuck you kid, your adopted'); //access denied message
}

const api = express();
api.use(express.json());
api.use(express.urlencoded({ extended: false }));
api.listen(port, () => { console.log(`Api up and running`) });

api.post('/', (req, res) => {
    if (!req.headers)  {
        denied(res);
    }
    var auth = req.headers['authorization'];
    if (auth && auth === totp(pass32)) { //check if authorization is equal to our temporary one time password
        axios.post(webhook, req.body) //send to our webhook
        .catch(function (error) {
          console.log(error);
        });
        res.send('done');
    } else {
        denied(res);
    }
});