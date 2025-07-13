const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nationalId: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    position: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],

        default: 'active'
    },
    jasirId: { type: String },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
module.exports = mongoose.model('Employee', employeeSchema);