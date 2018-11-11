import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const lecturerSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    image: String,
    coursesTeaching: [String],
    rating: Number,
});

export default mongoose.model('Lecturer', lecturerSchema);
