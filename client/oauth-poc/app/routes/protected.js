import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  setupController(controller) {
    this._super(controller);

    controller.set("session", this.get("session"));
  }
});
