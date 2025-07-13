const mongoose = require('mongoose');

const jisrSchema = new mongoose.Schema({
    apiKey: {
        type: String,
        required: true
    },
    apiSecret: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
})
module.exports = mongoose.model("Jisr", jisrSchema);