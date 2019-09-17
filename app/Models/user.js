const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    contact: {
        type: String,
        trim: true,
        required: true
    },
    isAdmin: {
        type: String,
        enum: ['0', '1'],
        required: true
    },
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    updated_at: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;