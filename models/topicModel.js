const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    topicName: {
        type: String,
        required: [true, "Please enter topic name"]
    },
    chapterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chapters",
        required: [true, "please enter chapter"]
    }
},
{ 
    timestamps: true
})

module.exports = mongoose.model('topics', topicSchema);