// const users = require('../models/usersModel');
// const ErrorHandler = require('../utils/errorHandler');
// const catchAsyncError = require('../middleware/catchAsyncError');
// const jwt = require('jsonwebtoken');

// exports.isAuthenticatedUser =  catchAsyncError(async(req, res, next)=>{
//     const { token } = req.cookies;

//     if(!token){
//         return next(new ErrorHandler('Please Login to access this resource', 401));
//     };

//     const decodedData = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = await users.findById(decodedData.id);
//     next();
// });