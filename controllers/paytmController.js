const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const PaytmChecksum = require("../paytm/PaytmChecksum");
const {v4:uuidv4}=require('uuid');
const formidable=require('formidable');
const https=require('https');
const paymentModel = require('../models/paymentModel');
const studentModel = require('../models/studentModel');

let userInfo = null;

exports.makePayment = catchAsyncError(async (req, res, next)=>{

    const{ amount,email }=req.body;
    userInfo = req.body;
    // const totalAmount=JSON.stringify(amount);
    /* import checksum generation utility */
    var params = {};

    /* initialize an array */
    params['MID'] = process.env.PAYTM_MID,
    params['WEBSITE'] = process.env.PAYTM_WEBSITE,
    params['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
    params['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
    params['ORDER_ID'] = uuidv4(),
    params['CUST_ID'] = process.env.PAYTM_CUST_ID,
    params['TXN_AMOUNT'] = amount,
    params['CALLBACK_URL'] = 'https://cbmkot171l.execute-api.us-east-2.amazonaws.com/production/payment/status',
    params['EMAIL'] = email,
    params['MOBILE_NO'] = '9876543210'
    /**
    * Generate checksum by parameters we have
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    */
    var paytmChecksum = PaytmChecksum.generateSignature(params, process.env.PAYTM_MERCHANT_KEY);
    paytmChecksum.then(function(checksum){
        // console.log("generateSignature Returns: " + checksum);
        let paytmParams={
            ...params,
            "CHECKSUMHASH":checksum
        }
        res.status(200).json(paytmParams);
    }).catch(function(error){
        console.log(error);
        res.status(500).json(error);
    });
});

exports.setPaymentStatus = catchAsyncError(async (req, res, next)=>{
    const form=new formidable.IncomingForm();

    form.parse(req,(err,fields,file)=>{
        // console.log('fields', fields)
        paytmChecksum = fields.CHECKSUMHASH;
        delete fields.CHECKSUMHASH;

        var isVerifySignature = PaytmChecksum.verifySignature(fields, process.env.PAYTM_MERCHANT_KEY, paytmChecksum);
        if (isVerifySignature) {
            var paytmParams = {};
            paytmParams["MID"]     = fields.MID;
            paytmParams["ORDERID"] = fields.ORDERID;
    
            /*
            * Generate checksum by parameters we have
            * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
            */
            PaytmChecksum.generateSignature(paytmParams, process.env.PAYTM_MERCHANT_KEY).then(function(checksum){
            
                paytmParams["CHECKSUMHASH"] = checksum;
            
                var post_data = JSON.stringify(paytmParams);
            
                var options = {

                    /* for Staging */
                    hostname: 'securegw-stage.paytm.in',
                    /* for Production */
                    // hostname: 'securegw.paytm.in',
                    port: 443,
                    path: '/order/status',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };
            
                var response = "";
                var post_req = https.request(options, function(post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });
            
                    post_res.on('end', async function(){
                        let result = JSON.parse(response);
                        
                        result.STUDENT_ID = userInfo.studentId;

                        const paytmData = await paymentModel.create(result);

                        if(paytmData.STATUS == 'TXN_SUCCESS') {
                            
                            let studentData = await studentModel.findById(paytmData.STUDENT_ID);
                            if (!studentData) {
                                return next(new ErrorHandler("student not found", 404));
                            }
                            
                            var currentDate = new Date();
                            var planDetails = null;

                            if(userInfo.day) {

                                if(studentData.planType != 'free plan' && studentData.subscriptionStatus == 'active'){
                                    let subscriptionEndDate = studentData.subscriptionEndDate;
                                    planDetails = {
                                        planType: userInfo.planType,
                                        subscriptionEndDate: new Date(subscriptionEndDate.setDate(subscriptionEndDate.getDate() + userInfo.day))
                                    }
                                } else {
                                    planDetails = {
                                        subscriptionStatus: 'active',
                                        planType: userInfo.planType,
                                        subscriptionStartDate: new Date(),
                                        subscriptionEndDate: new Date(currentDate.setDate(currentDate.getDate() + userInfo.day))
                                    }
                                }
                            } else if (userInfo.month) {
                                
                                if(studentData.planType != 'free plan' && studentData.subscriptionStatus == 'active'){
                                    let subscriptionEndDate = studentData.subscriptionEndDate;
                                    planDetails = {
                                        planType: userInfo.planType,
                                        subscriptionEndDate: new Date(subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + userInfo.month))
                                    }
                                } else {
                                    planDetails = {
                                        subscriptionStatus: 'active',
                                        planType: userInfo.planType,
                                        subscriptionStartDate: new Date(),
                                        subscriptionEndDate: new Date(currentDate.setMonth(currentDate.getMonth() + userInfo.month))
                                    }
                                }
                            } else if (userInfo.year) {
                                
                                if(studentData.planType != 'free plan' && studentData.subscriptionStatus == 'active'){
                                    let subscriptionEndDate = studentData.subscriptionEndDate;
                                    planDetails = {
                                        planType: userInfo.planType,
                                        subscriptionEndDate: new Date(subscriptionEndDate.setFullYear(subscriptionEndDate.getFullYear() + userInfo.year))
                                    }
                                } else {
                                    planDetails = {
                                        subscriptionStatus: 'active',
                                        planType: userInfo.planType,
                                        subscriptionStartDate: new Date(),
                                        subscriptionEndDate: new Date(currentDate.setFullYear(currentDate.getFullYear() + userInfo.year))
                                    }
                                }
                            }
                            const subscriptionDetail = await studentModel.findByIdAndUpdate(paytmData.STUDENT_ID, planDetails,
                                {
                                    new: true,
                                    runValidators: true,
                                    useFindAndModify: false
                                }
                            );

                            if (subscriptionDetail) {
                                // res.status(200).json({
                                //     success:true,
                                //     paytmData,
                                //     subscriptionDetail,
                                //     planDetails
                                // })
                                res.redirect(`http://localhost:3000/subscription-activated`)    
                            } else {
                                // res.status(200).json({
                                //     success:false,
                                //     message: "your payment have successful. If your subscription is not activated then contact to this number 1234567890 for activate your subscription"
                                // })
                                res.redirect(`http://localhost:3000/subscription-not-activated`)
                            }
                        } else {
                            // res.status(200).json({
                            //     success:false,
                            //     paytmData
                            // })
                            res.redirect(`http://localhost:3000/transaction-failed`)
                        }
                    });
                });
            
                post_req.write(post_data);
                post_req.end();
            });        

        } else {
            console.log("Checksum Mismatched");
        }

    })

});