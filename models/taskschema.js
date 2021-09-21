const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    mytask:{
        type :String,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const task = mongoose.model('task',taskSchema);

module.exports = task;