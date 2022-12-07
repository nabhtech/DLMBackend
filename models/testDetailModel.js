const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    testName: {
        type: String,
        required: [true, 'Please Enter test name']
    },
    title: {
        type: String,
        required: [true, 'Please Enter title for test']
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
    testDate: {
        type: Date,
        required: [true, 'Please Enter Test start date']
    },
    testEndDate: {
        type: Date,
        required: [true, 'Please Enter Test end date']
    },
    testDuration: {
        type: String,
        required: [true, 'Please Enter Test duration']
    },
    testStatus: {
        type: String,
        default: "empty",
        required: [true, 'Please Enter Test status']
    },
    // testQuestions: [
    //     { 
    //         type : mongoose.Schema.Types.ObjectId, 
    //         ref: 'questions_banks'
    //     }
    // ],
    testQuestions: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'questions_banks',
                required: [false, 'Please Enter question id']
            },
            mark: {
                type: Number,
                required: [false, 'Please Enter question mark']
            }
        }
    ],
    currentSessionId: {
        type: String,
        required: [true, "Please enter current school session of student"]
    }
},
{ 
    timestamps: true
});

module.exports = mongoose.model('test_details', testSchema);