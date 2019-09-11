const mongoose = require('mongoose');
let taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    name: {
        type: String,
        required: true
    },
    assign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'developers'
    },
    dueDate: {
        type: Date
    },
    status: {
        type: String
    },
    description: {
        type: String
    }
});
module.exports = mongoose.model('tasks', taskSchema);