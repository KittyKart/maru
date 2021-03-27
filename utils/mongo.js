const mongoose = require('mongoose')
const { MONGOSTRING } = require('../config.json')

module.exports = async () => {
  await mongoose.connect(MONGOSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  return mongoose
}