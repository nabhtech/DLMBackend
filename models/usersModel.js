const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, 'Please Enter first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please Enter last name']
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
    role: {
        type: String,
        required: [true, 'Please Enter role']
    }
},
{ 
    timestamps: true
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPass) {
    return await bcrypt.compare(enteredPass, this.password);
}

userSchema.methods.getJWTToken = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { 
        expiresIn: process.env.JWT_EXPIRE,
    });
}

module.exports = mongoose.model('users', userSchema);