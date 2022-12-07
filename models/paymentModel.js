const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    TXNID: {
        type: String,
        required: [true, "Please add Transaction Id"]
    },
    BANKTXNID: {
        type: String,
        required: [true, "Please add Bank Transaction id"]
    },
    ORDERID: {
        type: String,
        required: [true, "Please add Order id"]
    },
    TXNAMOUNT: {
        type: String,
        required: [true, "Please add Transaction amount"]
    },
    STATUS: {
        type: String,
        required: [true, "Please add Status"]
    },
    TXNTYPE: {
        type: String,
        required: [true, "Please add Transaction type"]
    },
    GATEWAYNAME: {
        type: String,
        required: [true, "Please add Gateway name"]
    },
    RESPCODE: {
        type: String,
        required: [true, "Please add Response code"]
    },
    RESPMSG: {
        type: String,
        required: [true, "Please add Response message"]
    },
    BANKNAME: {
        type: String,
        required: [true, "Please add Bank name"]
    },
    MID: {
        type: String,
        required: [true, "Please add Merchant id"]
    },
    PAYMENTMODE: {
        type: String,
        required: [true, "Please add Payment mode"]
    },
    REFUNDAMT: {
        type: String,
        required: [true, "Please add Refund amount"]
    },
    TXNDATE: {
        type: String,
        required: [true, "Please add Transaction date"]
    },
    STUDENT_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students'
    }
},
{ 
    timestamps: true
})

module.exports = mongoose.model('payments', paymentSchema);