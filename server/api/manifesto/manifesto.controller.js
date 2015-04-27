'use strict';

var _ = require('lodash');
var Manifesto = require('./manifesto.model');

// Get list of manifestos
exports.index = function(req, res) {
  Manifesto.findRandom().limit(1).exec(function (err, manifestos) {
    if(err) { return handleError(res, err); }
    var keys = Object.keys(manifestos[0]._doc.data);
    var key = keys[Math.floor(Math.random()*keys.length)];
    var item = { 
      name: manifestos[0]._doc.name,
      section: key,
      data: manifestos[0]._doc.data[key]
    };
    
    return res.json(200, item);
  });
  // Manifesto.findOne(function (err, manifestos) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, manifestos);
  // });
};

// Get a single manifesto
exports.show = function(req, res) {
  Manifesto.findById(req.params.id, function (err, manifesto) {
    if(err) { return handleError(res, err); }
    if(!manifesto) { return res.send(404); }
    return res.json(manifesto);
  });
};

// Creates a new manifesto in the DB.
exports.create = function(req, res) {
  Manifesto.create(req.body, function(err, manifesto) {
    if(err) { return handleError(res, err); }
    return res.json(201, manifesto);
  });
};

// Updates an existing manifesto in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Manifesto.findById(req.params.id, function (err, manifesto) {
    if (err) { return handleError(res, err); }
    if(!manifesto) { return res.send(404); }
    var updated = _.merge(manifesto, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, manifesto);
    });
  });
};

// Deletes a manifesto from the DB.
exports.destroy = function(req, res) {
  Manifesto.findById(req.params.id, function (err, manifesto) {
    if(err) { return handleError(res, err); }
    if(!manifesto) { return res.send(404); }
    manifesto.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
