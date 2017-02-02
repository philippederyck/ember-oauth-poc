import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate: function() {
      let ctrl = this.get("controller");
      ctrl.set("errorMessage", "");

      let { identification, password } = ctrl.getProperties('identification', 'password');
      console.log(identification + " - " + password);

      this.get('session').authenticate('authenticator:credentials', identification, password).catch((reason) => {
        console.log("Setting error message: " + reason);
        ctrl.set('errorMessage', reason);
      });
    }
  }
});
