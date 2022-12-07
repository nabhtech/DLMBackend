const schoolSessionModel = require('../models/schoolSessionModel');
const catchAsyncError = require('../middleware/catchAsyncError');

exports.createSession = catchAsyncError(async(req,res)=> {
    const currentSession = await schoolSessionModel.create(req.body);
    res.status(200).json({
        success: true,
        currentSession
    });
});