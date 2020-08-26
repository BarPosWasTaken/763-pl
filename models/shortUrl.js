const mongoose = require('mongoose');

const shortUrlSchema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('763-pl', shortUrlSchema);