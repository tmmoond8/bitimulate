const Jwt = require('jsonwebtoken');
const { JWT_SECRET: secret } = process.env;

function generateToken(playload, subject) {
  return new Promise(
    (resolve, reject) => {
      Jwt.sign(playload, secret, {
        issuer: 'bitimulate',
        expiresIn: "7d",
        subject
      }, (error, token) => {
        if (error) reject(error);
        resolve(token);
      });
    }
  );
}

function decodeToken(token) {
  return new Promise(
    (resolve, reject) => {
      Jwt.verify(token, secret, (error, decoded) => {
        if (error) reject(error);
        resolve(decoded);
      });
    }
  );
}

exports.generateToken = generateToken;
exports.decodeToken = decodeToken;
