import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  ajax: Ember.inject.service('ajax'),

  setupController(controller) {
    this._super(controller);

    controller.set("session", this.get("session"));
  },

  actions: {
    fetchData() {
      let ctrl = this.get("controller");
      this.get("ajax").request("http://localhost:3000/protected", {
        headers: {
          Authorization: "Bearer " + this.get("session.data.authenticated.jwt")
        }
      }).then((data) => {
        ctrl.set("message", data.message);
      })
    }
  }
});
