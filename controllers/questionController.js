const questionBankModel = require('../models/questionModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');

// Create question api
exports.createQuestion = catchAsyncError(async(req, res, next)=>{
    const questions = await questionBankModel.create(req.body);

    res.status(200).json({
        success: true,
        questions
    });
}); 

// Get all questions by topic with answer for view
exports.allQuestions = catchAsyncError(async(req, res, next)=>{
    const questions = await questionBankModel.find({topicId: req.params.id});

    if (questions.length == 0) {
        return next(new ErrorHandler("Questions not found", 404));
    }

    res.status(200).json({
        success:true,
        questions
    });
});

// Get question by topic id but without answer
exports.getQuestions = catchAsyncError(async(req, res, next)=>{
    const questions = await questionBankModel.find({topicId: req.params.id}).select('-answer');

    if (questions.length == 0) {
        return next(new ErrorHandler("Questions not found", 404));
    }

    res.status(200).json({
        success:true,
        questions
    });
});

// Calculate score of exercise
exports.calculateScore = catchAsyncError(async(req, res, next)=>{
    const questionList = req.body.questions;
    var score = 0;
    var questionNum = 0;
    
    for(let i = 0; i < questionList.length; i++){
        questionNum = questionNum + 1;
        let data = await questionBankModel.find({$and:[
            {_id: {$eq:questionList[i].questionId}},
            {answer: {$eq:questionList[i].answer}}
        ]})
        if(data.length == 1){
            score = score + 1;
        }
        if(questionList.length == questionNum) {
            res.status(200).json({
                success: true,
                score
            });
        }
    };
});

// Update question by question id
exports.updateQuestion = catchAsyncError(async(req, res, next)=>{
    let question = await questionBankModel.findById(req.params.id);

    if(!question){
        return next(new ErrorHandler("Question not found", 404));
    }

    question = await questionBankModel.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success:true,
        question
    });
});

// Delete Question by question id
exports.deleteQuestion = catchAsyncError(async(req, res, next)=>{
    let question = await questionBankModel.findById(req.params.id);

    if(!question){
        return next(new ErrorHandler("Question not found", 404));
    }

    await question.remove();

    res.status(200).json({
        success: true,
        message: "Question deleted successfully"
    });
});

// get question with answer with array of question ids for result preview
exports.getQuestionsWithIds = catchAsyncError(async(req, res, next) =>{
    const questionData = req.body.questions;
    const question = await questionBankModel.find( { _id : { $in : questionData} } );

    if (question.length == 0) {
        return next(new ErrorHandler("Questions not found", 404));
    }

    res.status(200).json({
        success:true,
        question
    });
});
