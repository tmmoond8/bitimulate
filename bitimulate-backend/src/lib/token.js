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

exports.generateToken = generateToken;
