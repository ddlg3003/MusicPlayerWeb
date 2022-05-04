const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Plugin tao slug
// const slug = require('mongoose-slug-generator');
// mongoose.plugin(slug);

// Khởi tạo Schema
const Song = new Schema(
    {
        name: { type: String },
        singer: { type: String },
        image: { type: String },
        path: { type: String },
    },
    {
        timestamps: true,
    },
);

// export để dùng cho controller tương tác
module.exports = mongoose.model('Song', Song);
