const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const testDetailModel = require('../models/testDetailModel');
const ObjectId = require('mongoose').Types.ObjectId
const momentTz = require('moment-timezone');

// It creates a test details
exports.createTest = catchAsyncError(async (req, res, next) => {
    const test = await testDetailModel.create(req.body);

    res.status(200).json({
        success: true,
        test
    });
});


// It gets the last test name of subject
exports.getLastTestName = catchAsyncError(async (req, res, next)=> {
    const test = await testDetailModel.find({$and:[
        {classId: {$eq:req.params.classId}},
        {subjectId: {$eq:req.params.subjectId}}
    ]}, {_id: 0, testName: 1}).sort({_id:-1}).limit(1);
    
    if(test.length == 0){
        return next(new ErrorHandler("Test name not found", 404));
    }

    res.status(200).json({
        success: true,
        test
    })
});

// get particular test details by test id
exports.getTestDetail = catchAsyncError(async (req, res, next)=> {
    const test = await testDetailModel.aggregate([
        {
            $match: { _id:ObjectId(req.params.testId) }
        },
        {
            $unwind: "$testQuestions"
        },
        {
            $lookup: {
              from: "questions_banks",
              localField: "testQuestions.questionId",
              foreignField: "_id",
              as: "questionData"
            }
        },
        {  
            $group:{  
               _id:"$_id" ,
               testName: { "$first": "$testName" },
               title: { "$first": "$title" },
               classId: { "$first": "$classId" },
               subjectId: { "$first": "$subjectId" },
               testDate: { "$first": "$testDate" },
               testEndDate: { "$first": "$testEndDate" },
               testDuration: { "$first": "$testDuration" },
               testStatus: { "$first": "$testStatus" },
               testQuestions:{  
                  $push:{  
                      question:"$questionData",
                      mark:"$testQuestions.mark"
                  }
               },
               currentSessionId:{
                    "$first": "$currentSessionId"
               },
               previewTestStatus:{ "$first": "$previewTestStatus" }
            }
         }
    ])
    res.status(200).json({
        success: true,
        test    
    })
});

// update test details by id
exports.updateTestDetails = catchAsyncError(async(req, res, next)=>{
    let test = await testDetailModel.findById(req.params.id);

    if(!test){
        return next(new ErrorHandler("Test details not found", 404));
    }

    test = await testDetailModel.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success:true,
        test
    });
});

// delete test details by id
exports.deleteTestDetails = catchAsyncError(async(req, res, next)=>{
    let test = await testDetailModel.findById(req.params.id);

    if(!test){
        return next(new ErrorHandler("Test details not found", 404));
    }

    await test.remove();

    res.status(200).json({
        success: true,
        message: "Test details deleted successfully"
    });
});

// get all test by class and subject id
exports.getQuestions = catchAsyncError(async (req, res, next)=> {
    const test = await testDetailModel.find({
        $and: [
            {classId: {$eq: req.params.classId}},
            {subjectId: {$eq: req.params.subjectId}}
        ]
    })
    res.status(200).json({
        success: true,
        test
    });
});

//it count total number test created in school level
exports.getTestCount = catchAsyncError(async (req,res)=> {
    const num = await testDetailModel.countDocuments();
    res.status(200).json({
        success: true,
        num
    });
});

// it count total number of test taken in school level
exports.getTestTaken = catchAsyncError(async(req,res)=> {
    const num = await testDetailModel.countDocuments({'testStatus':'taken'});
    res.status(200).json({
        success: true,
        num
    });
});

//it count total number of test created for a particular class
exports.getTestCountByClass = catchAsyncError(async(req,res)=> {
    const count = await testDetailModel.countDocuments(
        {classId: {$eq:req.params.classId}},
    );
    res.status(200).json({
        success: true,
        count
    });
});

// it count total number of test taken for a particular class
exports.getTestTakenByClass = catchAsyncError(async(req,res)=> {
    const count = await testDetailModel.countDocuments({
        $and: [
            {classId: {$eq: req.params.classId}},
            {testStatus:{$eq: 'taken'}}
        ]
    });
    res.status(200).json({
        success: true,
        count
    });
});

// get past test detail of a particular class
exports.getPastTest = catchAsyncError(async(req,res) => {
    let date = momentTz(new Date()).tz('Asia/Kolkata')
    const test = await testDetailModel.find({
        $and: [
            {classId: {$eq: req.params.classId}},
            {testEndDate:{$lte:date.format('YYYY-MM-DD')}}
        ]
    },
    {
        testQuestions: 0
    });
    res.status(200).json({
        success: true,
        test
    });
});

// get upcoming test details of a particular class
exports.getNextTest = catchAsyncError(async(req,res) => {
    let date = momentTz(new Date()).tz('Asia/Kolkata')
    const test = await testDetailModel.find({
        $and: [
            {classId: {$eq: req.params.classId}},
            {testDate:{$gte:date.format('YYYY-MM-DD')}}
        ]
    },
    {
        testQuestions: 0
    });
    res.status(200).json({
        success: true,
        test
    });
});

//get test name and test id
exports.getTestName = catchAsyncError(async(req,res) =>{
    const projection = { _id: 1, testName: 1};
    const testName = await testDetailModel.find({
        $and: [
            {classId: {$eq: req.params.classId}},
            {subjectId: {$eq: req.params.subjectId}},
            // {testStatus: {}}
            {testDate: {$eq: req.body.testDate}},
        ]
    },projection);
    res.status(200).json(testName[0]);
});

//get test name and test id
exports.getTestDateByMonth = catchAsyncError(async(req,res) =>{
    const projection = { _id: 1, testName: 1, testDate: 1};

    const matchQuery = {
        classId: { $eq: ObjectId(req.params.classId)},
        subjectId: {$eq: ObjectId(req.params.subjectId)}
    }
    
    const data = await testDetailModel.aggregate([
        {
            $match: matchQuery
        },
        {
            $addFields: {  "testTakenMonth" : {$month: '$testDate'}}
        }
    ])

    matchQuery.$expr = {
        "$eq": [{"$month": "$testDate"},req.params.month]
    }

    const result = await testDetailModel.find( { ...matchQuery }, projection)
    res.status(200).json(result);
});

// get last test  15 id by subject 
exports.getTestList = catchAsyncError(async(req,res) =>{
    const projection = { testId: 1, testName: 1,testDate: 1};
    const tests = await testDetailModel.find({
        $and: [
            {classId: {$eq: req.params.classId}},
            {subjectId: {$eq: req.params.subjectId}},
            {testStatus:{$eq: 'taken'}}
        ]
    },projection).sort({updatedAt:-1}).limit(15);
    res.status(200).json({
        success: true,
        tests
    })
});