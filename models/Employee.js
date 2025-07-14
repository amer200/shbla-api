const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    jasirId: { type: String },
    client: {
        title: String,
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
})
module.exports = mongoose.model('Employee', employeeSchema);