const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Khởi tạo Schema
const Playlist = new Schema(
    {
        name: { type: String },
        content: { type: Array },
        image: 
        { 
            type: String, 
            default: 'https://png.pngtree.com/png-vector/20190329/ourlarge/pngtree-vector-music-note-icon-png-image_889465.jpg' 
        },
        _userid: { type: String },
    },
    {
        timestamps: true,
    },
);

// export để dùng cho controller tương tác
module.exports = mongoose.model('Playlist', Playlist);