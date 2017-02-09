import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  torii: Ember.inject.service(),
  ajax: Ember.inject.service(),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },

    loginImplicitGrant() {
      // METHOD 1
      // this.get("torii").open("facebook-connect").then((data) => {
      //   //Data contains the UID and accessToken.
      //
      //   console.log("FB Auth succeeded");
      //   console.log(data);
      //   console.log("Auth status: " + this.get("session.data.authenticated"));
      // });

      // METHOD 2
      // this.get("session").authenticate("authenticator:mytorii", "facebook-connect").then(() => {
      //   console.log("Auth succeeded");
      // })

      // METHOD 3
      this.get("torii").open("facebook-connect").then((data) => {
        //Data contains the UID and accessToken.
        console.log("FB Auth succeeded, forwarding access token to backend");
        console.log(data);
        this.get("session").authenticate("authenticator:accesstoken-facebook", data.accessToken).then(() => {
          console.log("Authentication succeeded");
        }).catch(() => {
          console.error("Authentication failed");
        });
      });
    },

    loginExplicitGrant() {
      return this.get("session").authenticate("authenticator:authorizationcode-facebook", 'facebook-oauth2');
    }
  }
});
