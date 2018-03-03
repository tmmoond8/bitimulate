import hello from 'hellojs';

hello.init({
  facebook: 103419253826655,
  google: '550176661068-7qc77k00sfv2ejk798fho9n1cj01updf.apps.googleusercontent.com'
}, {redirect_uri: '/redirect.html'});

export default(function() {
  return {
    facebook: () => {
      return new Promise((resolve, reject) => {
        // hellojs는 일반 Promise 가 아닌 Promise A+를 사용하므로, Promise 로 감싸줌
        hello.login('facebook', { scope: 'email'}).then(
          auth => resolve(auth.authResponse.access_token),
          e => reject(e)
        );
      })
    },
    google: () => {
      return new Promise((resolve, reject) => {
        hello.login('google', { scope: 'email' }).then(
          auth => resolve(auth.authResponse.access_token),
          e => reject(e)
        );
      })
    }
  }
})();