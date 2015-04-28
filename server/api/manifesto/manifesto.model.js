'use strict';

var mongoose = require('mongoose'),
    random = require('mongoose-random'),
    Schema = mongoose.Schema;

var ManifestoSchema = new Schema({
  name: String,
  data: Object,
});

ManifestoSchema.plugin(random, { path: 'r' });

module.exports = mongoose.model('manifestos', ManifestoSchema);
