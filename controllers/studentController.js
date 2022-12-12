const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const studentModel = require('../models/studentModel');
const sendToken = require('../utils/jwtToken');
const ObjectId = require('mongoose').Types.ObjectId

// Register Student controller
exports.registerStudent = catchAsyncError(async(req, res, next)=>{
    const { firstName, lastName, fatherName, motherName, dob, email, password, mobileNumber, className, gender, currentSessionId } = req.body
    const user = await studentModel.create(
        { firstName, lastName, fatherName, motherName, dob, email, password, mobileNumber, className, gender, currentSessionId }
    );

    sendToken(user, 200, res);
});

// Login Student
exports.loginStudent = catchAsyncError(async(req, res, next)=>{
    const { email, password } = req.body;

    if(!email || !password){
        return next(new ErrorHandler('Please Enter username and password', 401));
    }

    const student = await studentModel.findOne({email}).select('+password');

    if(!student){
        return next(new ErrorHandler('Invalid username and password', 401))
    }

    const isPasswordMatched = await student.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid username and password', 401));
    }

    sendToken(student, 200, res);
});

// update student by id
exports.updateStudentDetail = catchAsyncError(async (req, res, next)=>{
    let student = await studentModel.findById(req.params.id);
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }

    student = await studentModel.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success:true,
        student
    })
});

// update student password by id
exports.updateStudentPassword = catchAsyncError(async (req, res, next)=>{
    let student = await studentModel.findById(req.params.id);

    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }

    if (!req.body.password) {
        return next(new ErrorHandler("Please provide password", 404));
    }
    
    student.password = req.body.password
    student = await student.save();

    res.status(200).json({
        success:true,
        student
    })
});

// get total number of student in school
exports.getStudentsCount = catchAsyncError(async(req,res)=> {
    const count = await studentModel.countDocuments();
    res.status(200).json({
        success: true,
        count
    });
});

//Get details of a particular student
exports.singleStudentDetail = catchAsyncError(async(req,res)=> {
    const details = await studentModel.find({_id: {$eq:req.params.id}});
    res.status(200).json({
        success: true,
        details
    });
});
// Get details of all students
exports.studentDetails = catchAsyncError(async(req,res)=>{
    // const details = await studentModel.find({_id: {$eq:req.params.id}});
    const details = await studentModel.aggregate([
        {
            $match:{
                _id: ObjectId(req.params.id)
            }
        },
        {
            $lookup: {
                from: 'classes',
                localField: 'className',
                foreignField: '_id',
                as: 'className'
            }
        }
    ]);
    res.status(200).json({
        success: true,
        details
    })
})