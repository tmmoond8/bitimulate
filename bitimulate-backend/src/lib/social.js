const FB = require('fb');
const { google } = require('googleapis');

const plus = google.plus('v1');
function getFacebookProfile(accessToken) {
  return FB.api('me', { fields: ['email'], access_token: accessToken }).then(
    (auth) => ({
      id: auth.id,
      email: auth.email
    })
  );
}

function getGoogleProfile(accessToken) {
  return new Promise((resolve, reject) => {
    plus.people.get({
      userId: 'me', 
      access_token: accessToken
    }, (err, response) => {
      if(err) {
        console.log(err);
        reject(err);
      }
      console.log('promise getGoogleProfile', response.data);
      const { data: user } = response;
      resolve({
        id: user.id,
        email: user.emails[0].value
      });
    });
  });
}

exports.getProfile = (provider, accessToekn) => {
  const getters = {
    facebook: getFacebookProfile,
    google: getGoogleProfile
  };
  return getters[provider](accessToekn);
};