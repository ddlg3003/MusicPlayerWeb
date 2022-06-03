const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Khởi tạo Schema
const User = new Schema(
    {
        avatar: {
            type: String,
            default:
                'https://i.pinimg.com/736x/1e/3f/25/1e3f255597ca9c75d789c39f31c47262.jpg',
        },
        username: { type: String, unique: true },
        email: { type: String },
        password: { type: String },
        role: { type: String, default: 'user' },
        // createdAt: { type: Date, default: Date.now },
        // updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    },
);

// export để dùng cho controller tương tác
module.exports = mongoose.model('User', User);