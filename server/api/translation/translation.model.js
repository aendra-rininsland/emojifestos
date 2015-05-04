'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TranslationSchema = new Schema({
  translation: String,
  text: String,
  party: String,
  section: String,
  key: String,
  user: Object,
});

module.exports = mongoose.model('Translation', TranslationSchema);
