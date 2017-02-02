// app/authenticators/torii.js
import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
export default ToriiAuthenticator.extend({
  torii: Ember.inject.service()
});
