const mongoose = require('mongoose');
const { schema } = require('./subjectModel');

const chapterSchema = new mongoose.Schema({
    chapterName:{
        type: String,
        required: [true, "Please enter chapter name"]
    },
    subjectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjects",
        required:[true, "Please enter subject"]
    },
    classId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "classes",
        required: [true, "Please enter class"]
    }
},
{ 
    timestamps: true
})

module.exports = mongoose.model('chapter', chapterSchema);