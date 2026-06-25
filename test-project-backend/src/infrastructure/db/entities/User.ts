import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mytasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
            default: []
        }]

});

const User = mongoose.model('User', userSchema);

export default User;