import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  ajax: Ember.inject.service(),

  authenticate(username, password) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      console.log("Credential Authentication: " + username + " - " + password);
      this.get("ajax").post("http://localhost:4000/login", {
        data: {
          username: username,
          password: password
        }
      }).then((data) => {
        console.error("AJAX SUCCESS: " + data);
        //TODO handle authN errors?
        resolve(data);
      }).catch((error) => {
        console.error("AJAX ERROR: " + error);
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
