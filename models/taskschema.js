const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    mytask:{
        type :String,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    },
    email:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    }
});

const task = mongoose.model('task',taskSchema);

module.exports = task;