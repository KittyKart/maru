const mongoose = require('mongoose');

const muteRole = mongoose.Schema({
    guildid: String,
    muteRole: String
});

module.exports = mongoose.model('muteRole', muteRole)