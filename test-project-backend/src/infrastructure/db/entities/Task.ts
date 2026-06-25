import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignees: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }]


});

const Task = mongoose.model('Task', taskSchema);

export default Task;