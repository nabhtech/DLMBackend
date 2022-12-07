const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: [true, "Please add subject name"]
    }
},
{ 
    timestamps: true
})

module.exports = mongoose.model('subjects', subjectSchema);