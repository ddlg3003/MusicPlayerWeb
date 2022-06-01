const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Khởi tạo Schema
const Playlist = new Schema(
    {
        name: { type: String },
        content: { type: Array },
        image: { type: String },
        // _userid: { type: String },
    },
    {
        timestamps: true,
    },
);

// export để dùng cho controller tương tác
module.exports = mongoose.model('Playlist', Playlist);