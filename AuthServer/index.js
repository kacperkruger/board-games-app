const express = require('express');
const axios = require('axios');
const pkceChallenge = require("pkce-challenge").default;
const cookieParser = require("cookie-parser")
const cors = require('cors');

const homeURL = process.env.HOME_URL;

const app = express();
app.use(cors({ origin: [
        homeURL,
    ],
    credentials: true }))

app.use(cookieParser())

const appPort = 5000;

const host = process.env.HOST || 'localhost';
const realm = process.env.REALM;

const authEndpoint = `http://${host}/realms/${realm}/protocol/openid-connect/auth`;
const tokenEndpoint = `http://${host}/realms/${realm}/protocol/openid-connect/token`;

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

let challengePair = undefined;

const redirectUri = process.env.REDIRECT_URI;


const authRequest = (code_challenge) => {
    return `${authEndpoint}?
response_type=code&
client_id=${clientId}&
state=1234&
redirect_uri=${redirectUri}&
code_challenge=${code_challenge}&
code_challenge_method=S256`;
};

app.get('/login', (req, res) => {
    challengePair  = pkceChallenge();
    res.setHeader("Location", authRequest(challengePair.code_challenge));
    res.sendStatus(303);
});

app.get('/redirect', (req, res) => {
    const params = new URLSearchParams();

    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', redirectUri);
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('code_verifier', challengePair.code_verifier);
    params.append('code', req.query.code);

    axios.post(tokenEndpoint, params).then(result => {
        const accessToken = result.data.access_token;
        res.setHeader("Location", homeURL);
        res.setHeader("SET-COOKIE", "access_token=" + accessToken + "; HttpOnly");
        return res.sendStatus(200);
    }).catch(error => {
        return res.status(401).send(error.errorMessage);
    })
});

app.listen(appPort, err => {
    console.log(`App listening on port ${appPort}`);
});
