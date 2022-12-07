const users = require('../models/usersModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtToken');

// Register user controller
exports.registerUser = catchAsyncError(async(req, res, next)=>{
    const { firstName, lastName, email, password, mobileNumber, role } = req.body
    const user = await users.create({firstName, lastName, email, password, mobileNumber, role});

    sendToken(user, 200, res);
});

// Login user
exports.loginUser = catchAsyncError(async(req, res, next)=>{
    const { email, password } = req.body;

    if(!email || !password){
        return next(new ErrorHandler('Please Enter username and password', 401));
    }

    const user = await users.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorHandler('Invalid username and password', 401))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid username and password', 401));
    }

    sendToken(user, 200, res);
});

// Logout api 
exports.logoutUser = catchAsyncError(async(req, res, next)=>{
    // res.cookie('token', null, {
    //     expires: new Date(Date.now()),
    //     httpOnly: true,
    // });

    res.status(200).json({
        success: true,
        message: 'Logged out',
    });
});