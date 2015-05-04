'use strict';

var _ = require('lodash');
var Translation = require('./translation.model');
var config = require('../../config/environment');
var Twit = require('twit');
var T = new Twit({
  consumer_key:         config.twitter.clientID, 
  consumer_secret:      config.twitter.clientSecret,
  access_token:         process.env.BOT_TOKEN,
  access_token_secret:  process.env.BOT_SECRET
});

// Get list of translations
exports.index = function(req, res) {
  Translation.find(function (err, translations) {
    if(err) { return handleError(res, err); }
    return res.json(200, translations);
  });
};

// Get a single translation
exports.show = function(req, res) {
  Translation.findById(req.params.id, function (err, translation) {
    if(err) { return handleError(res, err); }
    if(!translation) { return res.send(404); }
    return res.json(translation);
  });
};

// Creates a new translation in the DB.
exports.create = function(req, res) {
  Translation.create(req.body, function(err, translation) {
    if(err) { return handleError(res, err); }
    
    // Tweet aboot it!
    T.post('statuses/update', { status: req.body.translation + ' — ' + req.body.party + ' Party' + ' ' + 'http://www.emojifestos.com/translation/' + translation.id }, function(err, data, response) {
      console.log('Tweeted!');
      console.log(data);
    })
    
    return res.json(201, translation);
  });
};

// Updates an existing translation in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Translation.findById(req.params.id, function (err, translation) {
    if (err) { return handleError(res, err); }
    if(!translation) { return res.send(404); }
    var updated = _.merge(translation, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, translation);
    });
  });
};

// Deletes a translation from the DB.
exports.destroy = function(req, res) {
  Translation.findById(req.params.id, function (err, translation) {
    if(err) { return handleError(res, err); }
    if(!translation) { return res.send(404); }
    translation.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
