const classModel = require('../models/classModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const ObjectId = require('mongoose').Types.ObjectId

// For creating class
exports.createClass = catchAsyncError(async (req, res, next)=>{
    const data = await classModel.create(req.body);
    res.status(200).json({
        success: true,
        data
    })
});

// Get particular class details
exports.getSingleClass = catchAsyncError(async (req, res, next)=>{
    const classDetail = await classModel.aggregate([
        {
            $match: {
                _id: ObjectId(req.params.classId)
            }
        },
        {
            $lookup: {
                from: 'subjects',
                localField: 'subjects',
                foreignField: '_id',
                as: 'subjects'
            }
        }
    ])
    res.status(200).json({
        success: true,
        classDetail
    })
});

// Get all classes
exports.getClasses = catchAsyncError(async (req, res)=>{
    const data = await classModel.find();
    res.status(200).json({
        success: true,
        data
    })
});

// update class by id
exports.updateClass = catchAsyncError(async (req, res, next)=>{
    let data = await classModel.findById(req.params.id);
    if (!data) {
        return next(new ErrorHandler("class not found", 404));
    }
    
    data = await classModel.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success:true,
        data
    })
});

// delete class by id
exports.deleteClass =catchAsyncError( async (req, res, next)=>{
    let data = await classModel.findById(req.params.id);

    if(!data) {
        return next(new ErrorHandler("class not found", 404));
    }

    await data.remove();

    res.status(200).json({
        success: true,
        message: "Class deleted successfully"
    })
});