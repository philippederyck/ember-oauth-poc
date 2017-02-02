import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  ajax: Ember.inject.service(),

  authenticate(username, password) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      console.log("Credential Authentication: " + username + " - " + password);

      this.get("ajax").post("http://localhost:3000/credentials/login", {
        data: {
          username: username,
          password: password
        }
      }).then((data) => {
        console.log("AJAX SUCCESS: " + data);
        if(data.jwt && data.jwt.valid) {
          console.log("Valid JWT token received");
          console.log(data.jwt);
          resolve(data.jwt);
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
