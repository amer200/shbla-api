const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'اسم الشركة مطلوب'],
        trim: true
    },
    contactPerson: {
        type: String,
        required: [true, 'اسم مسؤول التواصل مطلوب']
    },
    phone: {
        type: String,
        required: [true, 'رقم الهاتف مطلوب'],
        match: [/^01[0-9]{9}$/, 'رقم الهاتف غير صحيح']
    },
    email: {
        type: String,
        required: [true, 'البريد الإلكتروني مطلوب'],
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'برجاء إدخال بريد إلكتروني صالح'
        ]
    },
    address: {
        type: String,
        default: ''
    },
    active: {
        type: Boolean,
        default: true
    },
    assignedCars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    }],
    assignedGuards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guard'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Client', clientSchema);