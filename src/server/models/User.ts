import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    image: String,
    admin: Boolean,
});

export default mongoose.model('User', userSchema);
