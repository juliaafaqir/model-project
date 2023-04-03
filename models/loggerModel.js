const mongoose = require('mongoose')

const loggerSchema = mongoose.Schema({
    logs: String
})

module.exports = mongoose.model('Log', loggerSchema)