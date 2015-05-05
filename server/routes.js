/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/translations', require('./api/translation'));
  app.use('/api/manifestos', require('./api/manifesto'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // Serve emoji picker img.
  app.route('/img/emojis@2x.png')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/assets/images/emojis@2x.png');
  });
  app.route('/img/emoji-groups.png')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/assets/images/emoji-groups.png');
  });

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
