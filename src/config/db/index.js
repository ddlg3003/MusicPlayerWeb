const mongoose = require('mongoose');

// Hàm async để kết nối đến mongodb
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Music');
        console.log('connect successfully');
    } catch (error) {
        console.log('cannot connect');
    }
}

// export để dùng cho kết nối
module.exports = { connect };