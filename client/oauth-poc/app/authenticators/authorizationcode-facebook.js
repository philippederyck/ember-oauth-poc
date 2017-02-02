import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  ajax: Ember.inject.service(),

  authenticate(authcode) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      console.log("Verifying FB Authorization code: " + authcode);

      this.get("ajax").post("http://localhost:3000/explicitgrant/facebook", {
        data: {
          authorizationcode: authcode
        }
      }).then((data) => {
        console.log("AJAX SUCCESS: " + data);
        if(data.jwt && data.jwt) {
          console.log("Valid JWT token received");
          console.log(data.jwt);
          resolve(data);
        }
        else {
          console.error("Invalid JWT token received");
          console.log(data.jwt);
          reject("Invalid token");
        }
      }).catch((error) => {
        console.error("AJAX ERROR: " + error);
        //TODO distinguish between error messages
        reject("Authentication failed: " + error);
      });
    });
  },

  restore(data) {
    //TODO implement
  },

  invalidate(data) {
    //TODO implement
  }
});
