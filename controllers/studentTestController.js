const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const studentTestModel = require('../models/studentTestModel');
const questionBankModel = require('../models/questionModel');
const testDetailModel = require('../models/testDetailModel');
const ObjectId = require('mongoose').Types.ObjectId
const studentModel = require('../models/studentModel');

// Create all student test record for particular test
exports.generateStudentTestRecord = catchAsyncError(async (req, res, next)=> {
    const data = await studentModel.find({className: req.body.classId},{_id: 1,className: 1});
    let studentRecord = []
   
    for(let i = 0; i < data.length; i++){
        studentRecord.push({
            studentId: data[i]._id,
            classId: req.body.classId,
            testId: req.body.testId,
            subjectId: req.body.subjectId,
            isPresent: "false",
            showTest: "false",
            resultStatus: "failed",
            currentSessionId: req.body.currentSessionId
        });
    }

    await studentTestModel.insertMany(studentRecord)
    res.status(200).json({
        success: true
    })
});

// to update student test record
exports.updateStudentTestRecord = catchAsyncError(async(req, res, next)=>{

    var { testRecord, totalMarks, testTakenDuration, testTakenDate, currentSessionId} = req.body
    var obtainedMarks = 0
    var resultStatus = ""
    var percentage = 0
    var trophies = 0
    var medals = 0
    const questionList = testRecord;
    var score = 0;
    var questionNum = 0;
    
    for(let i = 0; i < questionList.length; i++){
        questionNum = questionNum + 1;
        let data = await questionBankModel.find({$and:[
            {_id: {$eq:questionList[i].questionId}},
            {answer: {$eq:questionList[i].answer}}
        ]})
        if(data.length == 1){
            score = score + questionList[i].mark;
        }
        if(questionList.length == questionNum) {
            obtainedMarks = score

            percentage = (100 * (score/totalMarks)).toFixed(2)
            
            
            if(percentage >= 85)
            {
                resultStatus = "passed",
                trophies = 2,
                medals = 0
            } else if(percentage <=84 && percentage >=60) {
                resultStatus = "passed",
                trophies = 1,
                medals = 0
            } else if(percentage <=59 && percentage >=45) {
                resultStatus = "passed",
                trophies = 0,
                medals = 5
            } else if(percentage <=44 && percentage >=33){
                resultStatus = "passed",
                trophies = 0,
                medals = 2
            } else {
                resultStatus = "failed",
                trophies = 0,
                medals = 0
            }
        }
    };
    
    const test = await studentTestModel.find({
        $and: [
            {studentId: {$eq: req.params.studentId}},
            {testId: {$eq: req.params.testId}}
        ]
    });
    
    const updateTest = await studentTestModel.findOneAndUpdate({studentId: req.params.studentId, testId: req.params.testId},{  
        testRecord,
        totalMarks,
        obtainedMarks,
        testTakenDuration,
        resultStatus,
        percentage,
        trophies,
        medals,
        testTakenDate,
        currentSessionId,
        isPresent
    },
    {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        test
    });
});

// This api get percentage based on student id and optional subject id and month
exports.getPercentagebySubAndMonth = catchAsyncError(async(req, res, next)=> {

    if(!req.params.studentId){
        return next(new ErrorHandler('Please provide student Id', 401))
    }

    const matchQuery = {
        studentId: { $eq: ObjectId(req.params.studentId)},
        showTest: { $eq: true }
    }

    if (req.query.subjectId) {
        matchQuery.subjectId = {$eq: ObjectId(req.query.subjectId)}
    }
    
    const data = await studentTestModel.aggregate([
        {
            $match: matchQuery
        },
        {
            $addFields: {  "testTakenMonth" : {$month: '$testTakenDate'}}
        }
    ])

    if(req.query.month) {
        matchQuery.$expr = {
            "$eq": [{"$month": "$testTakenDate"},Number(req.query.month)]
      }
    }

    // const result = await studentTestModel.find( { ...matchQuery }, { _id: 0, percentage: 1 } );
    const result = await studentTestModel.aggregate([
        {
            $match: matchQuery
        },
        {
            $lookup: {
                from: 'test_details',
                localField: 'testId',
                foreignField: '_id',
                as: 'testId'
            }
        },
        {
            $project: { 
                _id: 0, 
                percentage: 1,
                'testId.testName': 1
            } 
        }
    ]);

    res.status(200).json({
        success: true,
        result
    });
}); 

// to calculate trophies and medals of each student
exports.calculateReward = catchAsyncError(async(req,res) => {
    const reward = await studentTestModel.aggregate([
    { 
        $match: {
            studentId: ObjectId(req.params.studentId)
        } 
    },
    {
        $group: {
            _id: '',
            trophies: { $sum: '$trophies' },
            medals: { $sum: '$medals' }
        }
    }, 
    {
        $project: {
            _id: 0,
            totaltrophies: '$trophies',
            totalmedals: '$medals'
        }
    }
]);
         res.status(200).json(reward);
});

//to count student attendence
exports.countStudentPresent = catchAsyncError(async(req,res) =>{
    const present =  await studentTestModel.count({studentId: {$eq:req.params.studentId}});
    res.status(200).json({
        success: true,
        present
    });
});

//leaderboard API
exports.leaderBoard = catchAsyncError(async(req,res) =>{
    const classId = req.params.classId;
    let subjectId = ''
    let testId = ''
    const matchQuery = {
        $and:[
            {classId: {$eq: classId}},
            {showTest:{$eq: true}}
        ]
    }

    if (req.query.subjectId) {
        subjectId = req.query.subjectId;
        matchQuery.$and = [
            {classId: {$eq: classId}},
            {showTest:{$eq: true}},
            {subjectId: {$eq: subjectId}}
        ]
    }

    let lastTest = []
    let matchQuery2 = {}
    if(!req.query.testId) {
        lastTest = await studentTestModel.find({
            ...matchQuery
        },
        {_id: 0, testId: 1}).sort({testTakenDate:-1}).limit(1);
        // console.log(lastTest);
        matchQuery2 = {
            $and: [
                {classId: {$eq: ObjectId(classId)}},
                {showTest:{$eq: true}},
                {testId: {$eq: ObjectId(lastTest[0].testId)}}
            ]
        } 
    }

    if(req.query.testId) {
        testId = req.query.testId
        matchQuery2.$and = [
            {classId: {$eq: ObjectId(classId)}},
            {showTest:{$eq: true}},
            {subjectId: {$eq: ObjectId(subjectId)}},
            {testId: {$eq: ObjectId(testId)}}
        ]
    }

    // const rankList = await studentTestModel.find({
    //     ...matchQuery2
    // }, 
    // {studentId: 1 ,percentage: 1}).sort({percentage:-1});

    const rankList = await studentTestModel.aggregate([
        {
            $match: matchQuery2
        },
        {
            $lookup: {
                from: 'students',
                localField: 'studentId',
                foreignField: '_id',
                as: 'studentId'
            },
        },
        {
            $lookup: {
                from: 'subjects',
                localField: 'subjectId',
                foreignField: '_id',
                as: 'subjectId'
            }
        },
        {
            $lookup: {
                from: 'test_details',
                localField: 'testId',
                foreignField: '_id',
                as: 'testId'
            }
        },
        {
            $project: {
              "_id": 0,
              "testId.testName": 1,
              "subjectId.subject": 1,
              "percentage": 1,
              "trophies": 1,
              "medals": 1,
              "studentId._id": 1,
              "studentId.firstName": 1,
              "studentId.lastName": 1          
            }
        }
    ])
    res.status(200).json({
        success: true,
        rankList
    });
});

//show test record
exports.showTestRecord = catchAsyncError(async(req,res)=>{
    const showTest = await studentTestModel.aggregate([
        { 
            $match: {
                classId: ObjectId(req.params.classId),
                subjectId: ObjectId(req.params.subjectId),
                testId: ObjectId(req.params.testId)
            } 
        },
        {
            $lookup: {
                from: 'students',
                localField: 'studentId',
                foreignField: '_id',
                as: 'studentId'
            }
        },
        {
            $project: {
                "_id": 0,
                "studentId._id": 1,
                "studentId.firstName": 1,
                "studentId.lastName": 1,
                "totalMarks": 1,
                "obtainedMarks": 1,
                "percentage": 1,
                "trophies": 1,
                "medals": 1,
            }
        }
    ]);
    res.status(200).json({
        success: true,
        showTest
    });
});

// Show Question answers
exports.ShowQueAns = catchAsyncError(async(req,res)=>{
    const showQues = await studentTestModel.aggregate([
        { 
            $match: {
                testId: ObjectId(req.params.testId),
                studentId: ObjectId(req.params.studentId)
            } 
        },
        {
            $lookup: {
                from: 'questions_banks',
                localField: 'testRecord.questionId',
                foreignField: '_id',
                as: 'studentTestRecord'
            }
        },
        {
            $project: {
                "testRecord.questionId": 1,
                "testRecord.answer": 1,
                "testRecord.mark": 1,
                "studentTestRecord._id": 1,
                "studentTestRecord.question": 1,
                "studentTestRecord.options": 1,
                "studentTestRecord.answer": 1,
                "answer": 1
            }
        }
    ]);
    res.status(200).json({
        success: true,
        showQues
    });
});

exports.updateStudentAttendance = catchAsyncError(async(req, res, next)=>{
    
    let student = await studentTestModel.findOneAndUpdate({studentId :req.params.studentId, testId: req.params.testId}, {isPresent: true},{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    if (!student) {
        return next(new ErrorHandler("student not found", 404));
    }

    res.status(200).json({
        success:true
    })
});