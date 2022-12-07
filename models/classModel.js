const mongoose = require('mongoose');

const  classSchema = new mongoose.Schema({
    class: {
        type: String,
        required: [true, "Please add class"]
    },
    subjects: {
        type: Array,
        required: [true, "Please add all subjects"]
    }
},
{ 
    timestamps: true
})

module.exports = mongoose.model('classes', classSchema);