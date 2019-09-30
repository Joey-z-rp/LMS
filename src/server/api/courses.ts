import * as moment from 'moment';
import Course from '../models/Course';
import Student from '../models/Student';
import Lecturer from '../models/Lecturer';
import { processLecturer } from './lecturers';
import { mapStudent } from "./students";

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
        students: students.map(student => mapStudent(student)),
        lecturer: processLecturer(lecturer),
    };

    res.json(result);
};

export const createCourse = async (req, res) => {
    console.log({file: req.file})
    console.log({body: req.body})
    const course = new Course(createCourseFromData({
        ...req.body,
        image: req.file && req.file.location,
    }));

    const result = await course.save();

    const lecturer = await Lecturer.findById(result.lecturer);
    lecturer.coursesTeaching.push(result._id.toString());
    await lecturer.save();

    res.json(result);
};

export const saveCourse = async (req, res) => {
    console.log({file: req.file})
    console.log({body: req.body})

    // TODO scroll to top onloaded

    const image = req.file
        ? req.file.location
        : (await Course.findById(req.params.id)).image;

    const course = createCourseFromData(createCourseFromData({
        ...req.body,
        image,
    }));
    delete course.students;

    const result = await Course.findByIdAndUpdate(req.params.id, course);

    res.json(result);

};

export const deleteCourse = async (req, res) => {
    const result = await Course.findByIdAndRemove(req.params.id);

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