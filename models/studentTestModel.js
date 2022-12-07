const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "students", 
        required:[true, "Please enter student Id"]
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
    testId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "test_details",
        required:[true, "Please enter test Id"]
    },
    testRecord: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'questions_banks',
                required: [true, 'Please Enter question id']
            },
            answer: {
                type: Number,
                required: [false, 'Please Enter the answer']
            },
            mark: {
                type: Number,
                required: [true, 'Please Give question mark']
            }
        }
    ],
    totalMarks:{
        type: Number,
        required: [true, 'Please enter total marks']
    },
    obtainedMarks:{
        type: Number,
        required: [true, 'Please enter the obtained marks ']
    },
    testTakenDuration: {
        type: String,
        required: [true, 'Please Enter Test duration']
    },
    resultStatus: {
        type: String,
        default: "nil",
        required: [true, 'Please Enter Test status']
    },
    percentage: {
        type: Number,
        required: [true,'Please enter the total percentage']
    },
    showTest: {
        type: Boolean,
        default: false
    },
    trophies: {
        type: Number,
        required: [true,'Please enter no. trophies']
    },
    medals: {
        type: Number,
        required: [true,'Please enter no. of medals']
    },
    testTakenDate:{
        type: Date,
        required: [true,'Please test taken Date']
    },
    currentSessionId: {
        type: String,
        required: [true, "Please enter current school session of student"]
    }
},
{ 
    timestamps: true
}
);

module.exports = mongoose.model('student_test_records', testSchema);