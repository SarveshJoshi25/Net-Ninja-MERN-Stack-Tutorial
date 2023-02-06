const mongoose = require('mongoose')

const schema = mongoose.Schema({
    emailAddress: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('User', schema)