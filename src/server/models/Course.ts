import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: String,
    description: String,
    from: Date,
    to: Date,
    image: String,
    lecturer: String,
    students: [String],
    capacity: Number,
});

export default mongoose.model('Course', courseSchema);
