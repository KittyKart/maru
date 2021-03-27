const mongoose = require('mongoose')

const infraction = mongoose.Schema({
  userid: String,
  guild: String,
  punishid: String,
  type: String,
  time: String,
  modid: String,
  reason: String,
  expires: Number
});

module.exports = mongoose.model('infraction', infraction)