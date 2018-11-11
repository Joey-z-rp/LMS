import Course from '../models/Course';
import Student from '../models/Student';
import { processCourse } from './courses';
import { mapStudent } from './students'

export const getEnrolData = async (req, res) => {
    const courseId = req.query.courseId;
    const studentId = req.query.studentId;

    if (courseId && studentId === 'undefined') { // Course page initiated

        const [course, students] = await Promise.all([
            Course.findById(courseId),
            Student.find({}),
        ]);

        const enrolledStudents = findCoursesOrStudents(students, course, true);

        const enrollableStudents = findCoursesOrStudents(students, course, false);

        const processedCourse = processCourse(course);
        processedCourse.students = enrolledStudents.map(student => mapStudent(student));
        return res.json({
            courses: [processedCourse],
            students: enrollableStudents.map(student => mapStudent(student)),
        });
    }

    // Student page initiated

    const [courses, students] = await Promise.all([
        Course.find({}),
        Student.find({}),
    ]);

    const student = students.find(student => student._id.toString() === studentId);

    const enrollableCourses = findCoursesOrStudents(courses, student, false);

    res.json({
        courses: processCourses(enrollableCourses, students),
        students: [mapStudent(student)],
    });
};

export const enrolStudent = async (req, res) => {
    const courseId = req.body.courseId;
    const studentId = req.body.studentId;
    const [course, student] = await Promise.all([
        Course.findById(courseId),
        Student.findById(studentId),
    ]);

    course.students.push(studentId);
    student.enrolledCourses.push(courseId);

    await Promise.all([
        Course.findByIdAndUpdate(courseId, course),
        Student.findByIdAndUpdate(studentId, student),
    ]);

    res.json({});
};

export const getWithdrawData = async (req, res) => {
    console.log(req.query)

    const courseId = req.query.courseId;
    const studentId = req.query.studentId;

    if (courseId && studentId === 'undefined') { // Course page initiated

        const [course, students] = await Promise.all([
            Course.findById(courseId),
            Student.find({}),
        ]);

        const enrolledStudents = findCoursesOrStudents(students, course, true);

        const processedCourse = processCourse(course);
        const processedStudents = enrolledStudents.map(student => mapStudent(student));
        processedCourse.students = processedStudents;

        return res.json({
            courses: [processedCourse],
            students: processedStudents,
        });
    }

    // Student page initiated

    const [courses, students] = await Promise.all([
        Course.find({}),
        Student.find({}),
    ]);

    const student = students.find(student => student._id.toString() === studentId);

    const enrolledCourses = findCoursesOrStudents(courses, student, true);

    res.json({
        courses: processCourses(enrolledCourses, students),
        students: [mapStudent(student)],
    });
};

export const withdrawStudent = async (req, res) => {
    console.log({withdraw: req.body});

    const courseId = req.body.courseId;
    const studentId = req.body.studentId;
    const [course, student] = await Promise.all([
        Course.findById(courseId),
        Student.findById(studentId),
    ]);

    course.students = course.students.filter(s => s !== student._id.toString());
    student.enrolledCourses = student.enrolledCourses.filter(c => c !== course._id.toString());

    await Promise.all([
        Course.findByIdAndUpdate(courseId, course),
        Student.findByIdAndUpdate(studentId, student),
    ]);

    res.json({});
};

function processCourses(courses, students) {
    return courses.map(course => ({
        ...processCourse(course),
        students: students.filter(s => course.students.includes(s._id.toString())),
    }));
}

function findCoursesOrStudents(toBeFiltered, filterAgainst, include: boolean) {
    return toBeFiltered.filter(courseOrStudent =>
        include
            ? filterAgainst[filterAgainst.enrolledCourses ? 'enrolledCourses' : 'students']
                .includes(courseOrStudent._id.toString())
            : !filterAgainst[filterAgainst.enrolledCourses ? 'enrolledCourses' : 'students']
                .includes(courseOrStudent._id.toString())
    );
}