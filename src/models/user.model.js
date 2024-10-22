import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    mobile: {
        type: String,
        required: [true, 'Mobile is required']
    },
    city: {
        type: String,
        required: [true, 'City is required']
    },
    message: {
        type: String,
        required: false
    },
    username: { type: String }
});
userSchema.post('init', function () {
    this.collection.createIndex({ username: 1 }, { unique: true, sparse: true });
});
const User = mongoose.model('User', userSchema);

export { User };
