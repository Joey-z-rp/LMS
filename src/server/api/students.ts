import Student from '../models/Student';
import Course from '../models/Course';
import * as moment from "moment";


export const getStudents = async (req, res) => {
    const students = await Student.find({});

    const result = processStudents(students);

    res.json(result);
};

export const searchStudents = async (req, res) => {
    const students = await Student.find({ name: new RegExp(req.params.search, 'gi') });

    const result = processStudents(students);

    res.json(result)
};

export const getStudent = async (req, res) => {
    const rawStudent = await Student.findById(req.params.id);
    const enrolledCourse = await Course.find({ _id: { $in: rawStudent.enrolledCourses } });
    const student = mapStudent(rawStudent);
    student.enrolledCourse = enrolledCourse;

    res.json(student);
};

export const registerStudent = async (req, res) => {
    console.log(req.body);

    const student = new Student(createStudentFromData(req.body));

    const result = await student.save();

    res.json(result);
};

export const saveStudent = async (req, res) => {
    const student = createStudentFromData(req.body);
    delete student.registered;
    delete student.attendance;
    delete student.enrolledCourses;

    const result = await Student.findByIdAndUpdate(req.params.id, student);

    res.json(result);
};

export const deleteStudent = async (req, res) => {
    const result = await Student.findByIdAndRemove(req.params.id);

    res.json(result);
};

export function mapStudent(rawStudent) {
    return {
        id: rawStudent._id.toString(),
        name: rawStudent.name,
        email: rawStudent.email,
        phone: rawStudent.phone,
        registered: moment(rawStudent.registered).format('YYYY-MM-DD'),
        image: rawStudent.image,
        enrolledCourse: rawStudent.enrolledCourse,
        attendance: rawStudent.attendance,
        premium: rawStudent.premium,
    };
}

function countEnrolledCourses(enrolledCourse) {
    return enrolledCourse
        ? enrolledCourse.length
        : 0;
}

function processStudents(students) {
    return students.map((rawStudent) => {
        const student = mapStudent(rawStudent);
        student.enrolledCourse = countEnrolledCourses(student.enrolledCourse);

        return student;
    });
}

function createStudentFromData(data) {
    return {
        name: data.name,
        email: data.email,
        phone: data.phone,
        registered: moment(),
        image: data.image,
        attendance: Math.floor((Math.random() * 100) + 1), // Random number of 1 to 100
        enrolledCourses: [],
        premium: data.premium,
    };
}