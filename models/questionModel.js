const mongoose = require('mongoose');

const  questionBankSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Please Enter question"]
    },
    options: [
        {
            optionId: {
                type: Number,
                required: [true, "Please Enter option id"]
            },
            value: {
                type: String,
                required: [true, "Please Enter value"]
            },
            selected: {
                type: Boolean
            },
            optionType:{
                type: String,
                required: [true, "Please Enter option type"]
            }
        },
    ],
    answer: {
        type: Number,
        required: [true, "Please provide answer"]
    },
    classId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "classes",
        required: [true, "Please enter classId"]
    },
    subjectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjects",
        required:[true, "Please enter subjectId"]
    },
    chapterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chapters",
        required: [true, "please enter chapter"]
    },
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "topics",
        required: [true, "Please enter topic"]
    }
},
{ 
    timestamps: true
})

module.exports = mongoose.model('questions_banks', questionBankSchema);
