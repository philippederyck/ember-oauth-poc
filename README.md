# ember-oauth-poc

PoC for various OAuth flows in Ember using Torii and ember-simple-auth

## Running the thing

* Launch the client app from `client/oauth-poc`: `ember s`
* Launch the Express backend from `server/oauthapi-poc`: `npm start`

## Routes in the app

* Default page does not do anything interesting
* `/login` route shows a login form for traditional authentication (any combo is accepted, as long as it's not empty)
* `/protected` route shows a page with a button to contact the backend. This request requires authentication first, and when it succeeds, your name should show up.