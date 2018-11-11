import * as moment from 'moment';
import Course from '../models/Course';
import Student from '../models/Student';
import Lecturer from '../models/Lecturer';
import { processLecturer } from './lecturers';

export const getCourses = async (req, res) => {
    const courses = await Course.find({});

    const result = courses.map(course => processCourse(course));

    res.json(result);
};

export const getCourse = async (req, res) => {
    const course = await Course.findById(req.params.id);

    const [students, lecturer] = await Promise.all([
        Student.find({ _id: { $in: course.students } }),
        Lecturer.findById(course.lecturer),
    ]);

    const result = {
        ...processCourse(course),
        students,
        lecturer: processLecturer(lecturer),
    };

    res.json(result);
};

export const createCourse = async (req, res) => {
    const course = new Course(createCourseFromData(req.body));

    const result = await course.save();

    res.json(result);
};

export const saveCourse = async (req, res) => {
    const course = createCourseFromData(req.body);
    delete course.students;

    const result = await Course.findByIdAndUpdate(req.params.id, course);

    res.json(result);

};

export function processCourse(rawCourse) {
    return {
        id: rawCourse._id.toString(),
        name: rawCourse.name,
        description: rawCourse.description,
        from: moment(rawCourse.from).format('YYYY-MM-DD'),
        to: moment(rawCourse.to).format('YYYY-MM-DD'),
        image: rawCourse.image,
        capacity: rawCourse.capacity,
        lecturer: rawCourse.lecturer,
        students: rawCourse.students.length,
    };
}

function createCourseFromData(data) {
    return {
        name: data.name,
        description: data.description,
        from: moment(data.from),
        to: moment(data.to),
        image: data.image,
        capacity: data.capacity,
        students: [],
        lecturer: data.lecturer,
    };
}