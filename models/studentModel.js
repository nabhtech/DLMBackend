const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const studentSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, 'Please Enter first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please Enter last name']
    },
    fatherName: {
        type: String,
        required: [true, 'Please Enter father name']
    },
    motherName: {
        type: String,
        required: [true, 'Please Enter mother name']
    },
    dob: {
        type: Date,
        required: [true, 'Please Enter date of birth']
    },
    email: {
        type: String,
        required: [true, 'Please Enter Email'],
        unique: true,
        validate: [validator.isEmail, 'Please Enter valid email']
    },
    password: {
        type: String,
        required: [true, 'Please Enter Password'],
        select: false
    },
    mobileNumber: {
        type: String,
        required: [true, 'Please Enter mobile number']
    },
    className: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "classes",
        required: [true, 'Please Enter class Name']
    },
    gender: {
        type: String,
        required: [true, 'Please select the gender ']
    },
    currentSessionId:{
        type: mongoose.Types.ObjectId,
        ref: "school_sessions",
        required: [true, 'Please enter current school session of student']
    },
    subscriptionStatus: {
        type: String,
        default: 'inactive'
    },
    planType: {
        type: String,
        default: 'free plan'
    },
    subscriptionStartDate: {
        type: Date
    },
    subscriptionEndDate: {
        type: Date
    }
},
{ 
    timestamps: true
});

studentSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

studentSchema.methods.comparePassword = async function (enteredPass) {
    return await bcrypt.compare(enteredPass, this.password);
}

studentSchema.methods.getJWTToken = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { 
        expiresIn: process.env.JWT_EXPIRE,
    });
}

module.exports = mongoose.model('students', studentSchema);