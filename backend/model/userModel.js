const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
