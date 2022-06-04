const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Genre = new Schema(
    {
        name: { type: String },
    },
    {
        timestamps: true,
    },
);

// export để dùng cho controller tương tác
module.exports = mongoose.model('Genre', Genre);
