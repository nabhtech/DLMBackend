const mongoose = require('mongoose');

const schoolSessionSchema = new mongoose.Schema({
    schoolSession : {
        type: String,
        required: [true, 'Please Enter School Session year']
    }
});

module.exports = mongoose.model('school_sessions', schoolSessionSchema);