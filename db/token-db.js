const mongoose = require('./mongodb-connect')

let tokenSchema = mongoose.Schema({
    unique: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

let Token = mongoose.model('token', tokenSchema);

module.exports = Token;