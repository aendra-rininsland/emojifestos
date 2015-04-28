'use strict';

var _ = require('lodash');
var Translation = require('./translation.model');

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