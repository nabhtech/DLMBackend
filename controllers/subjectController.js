const subjectModel = require('../models/subjectModel');
const catchAsyncError = require('../middleware/catchAsyncError');

// Create new subject 
exports.createSubject = catchAsyncError(async (req, res, next)=>{
    const subject = await subjectModel.create(req.body);
    res.status(200).json({
        success: true,
        subject
    })
});

// Get all subjects
exports.getSubjects = catchAsyncError(async (req, res, next)=>{
    const subjects = await subjectModel.find();
    res.status(200).json({
        success: true,
        subjects
    })
});

// Get subjects by subjects list of array
exports.getClassSubjects =catchAsyncError( async (req, res, next)=>{
    const subject = await subjectModel.find().where('_id').in(req.body.subjects).exec();
    res.status(200).json({
        success: true,
        subject
    });
});

