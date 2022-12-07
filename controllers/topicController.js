const topicModel = require('../models/topicModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const { findByIdAndUpdate } = require('../models/topicModel');

// Create new Topic
exports.createTopic = catchAsyncError(async (req, res, next)=>{
    const topic = await topicModel.create(req.body);

    res.status(200).json({
        success: true,
        topic
    })
});

// Get topic by Chapter id
exports.getTopicById = catchAsyncError(async (req, res, next)=>{
    const topic = await topicModel.find({chapterId: req.params.id});

    if (topic.length == 0) {
        return next(new ErrorHandler("Topic not found", 404));
    }

    res.status(200).json({
        success:true,
        topic
    })
});

// Update topic by chapter id
exports.updateTopicById = catchAsyncError(async(req, res, next)=>{
    let topic = await topicModel.findById(req.params.id);

    if(!topic){
        return next(new ErrorHandler("Topic not found", 404));
    }
    
    topic = await topicModel.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success:true,
        topic
    });
});

// Delete topic by id
exports.deleteTopic = catchAsyncError(async(req, res, next)=>{
    let topic = await topicModel.findById(req.params.id);

    if(!topic) {
        return next(new ErrorHandler("Topic not found", 404));
    }

    await topic.remove();

    res.status(200).json({
        success: true,
        message: "Topic deleted successfully"
    })
})