const request = require("request");
const jwkToPem = require("jwk-to-pem");
const jwt = require("jsonwebtoken");
const config = require("../config");
const AWS = require("aws-sdk");
const {
  cloud: {
    aws: {
      cognito: {
        region,
        poolData: { userPoolId },
      },
    },
  },
} = config;

exports.validateToken = function (token) {
  request(
    {
      url: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`,
      json: true,
    },
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        pems = {};
        var keys = body["keys"];
        for (var i = 0; i < keys.length; i++) {
          //Convert each key to PEM
          var key_id = keys[i].kid;
          var modulus = keys[i].n;
          var exponent = keys[i].e;
          var key_type = keys[i].kty;
          var jwk = { kty: key_type, n: modulus, e: exponent };
          var pem = jwkToPem(jwk);
          pems[key_id] = pem;
        }
        //validate the token
        var decodedJwt = jwt.decode(token, { complete: true });
        if (!decodedJwt) {
          console.log("Not a valid JWT token");
          return false;
        }

        var kid = decodedJwt.header.kid;
        var pem = pems[kid];
        if (!pem) {
          console.log("Invalid token");
          return false;
        }

        jwt.verify(token, pem, function (err, payload) {
          const { username } = payload;
          if (err) {
            console.log("Invalid Token.");
            return false;
          } else {
            console.log("Valid Token.");
            return true;
          }
        });
      } else {
        console.log("Error! Unable to download JWKs");
        return false;
      }
    }
  );
};
