import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    registered: Date,
    image: String,
    enrolledCourses: [String],
    attendance: Number,
    premium: Boolean,
});

export default mongoose.model('Student', studentSchema);
