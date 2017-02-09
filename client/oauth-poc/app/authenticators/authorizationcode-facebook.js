import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';

export default Torii.extend({
  torii: Ember.inject.service(),
  ajax:  Ember.inject.service(),

  authenticate(provider) {
    return this._super(...arguments)
      .then((data) => {
        let { authorizationCode } = data;
        console.log("Verifying FB Authorization code: " + authorizationCode);

        return this.get("ajax").post("http://localhost:3000/explicitgrant/facebook", {
          data: {
            authorizationcode: authorizationCode
          }
        }).then((data) => {
          console.log("AJAX SUCCESS: ", data);
          if(data.jwt && data.jwt) {
            console.log("Valid JWT token received");
            console.log(data.jwt);
            data.provider = provider;
            return data;
          }
          else {
            console.error("Invalid JWT token received");
            console.log(data.jwt);
            throw new Error("Invalid token");
          }
        }).catch((error) => {
          console.error("AJAX ERROR: " + error);
          //TODO distinguish between error messages
          throw new Error("Authentication failed: " + error);
        });
      });
  },

  // restore(data) {
  //   //TODO implement
  // },

  // invalidate(data) {
  //   //TODO implement
  // }
});
