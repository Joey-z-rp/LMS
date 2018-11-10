import fetch from 'cross-fetch';

// action types
​
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const FETCH_COURSES = 'FETCH_COURSES';
export const FETCHED_COURSES = 'FETCHED_COURSES';
export const FETCH_COURSE = 'FETCH_COURSE';
export const FETCHED_COURSE = 'FETCHED_COURSE';
export const FETCH_LECTURERS = 'FETCH_LECTURERS';
export const FETCHED_LECTURERS = 'FETCHED_LECTURERS';
export const CREATE_OR_SAVE_COURSE = 'CREATE_COURSE';
export const FETCH_STUDENTS = 'FETCH_STUDENTS';
export const FETCHED_STUDENTS = 'FETCHED_STUDENTS';
export const SEARCH_STUDENTS = 'SEARCH_STUDENTS';
​export const FETCHED_STUDENT = 'FETCHED_STUDENT';
export const REGISTER_OR_SAVE_STUDENT = 'REGISTER_OR_SAVE_STUDENT';

// action creators
​
export function toggleSidebar() {
    return { type: TOGGLE_SIDEBAR };
}

export function fetchCourses() {
    return { type: FETCH_COURSES };
}

export function fetchedCourses(courses) {
    return { type: FETCHED_COURSES, courses };
}

export function fetchCourse() {
    return { type: FETCH_COURSE };
}

export function fetchedCourse(course) {
    return { type: FETCHED_COURSE, course };
}

export function fetchLecturers() {
    return { type: FETCH_LECTURERS };
}

export function fetchedLecturers(lecturers) {
    return { type: FETCHED_LECTURERS, lecturers };
}

export function createOrSaveCourse() {
    return { type: CREATE_OR_SAVE_COURSE };
}

export function fetchStudents() {
    return { type: FETCH_STUDENTS };
}

export function fetchedStudents(students) {
    return { type: FETCHED_STUDENTS, students };
}

export function searchStudentsAction(search) {
    return { type: SEARCH_STUDENTS, search };
}

export function fetchedStudent(student) {
    return { type: FETCHED_STUDENT, student };
}

export function registerOrSaveStudent() {
    return { type: REGISTER_OR_SAVE_STUDENT };
}

// async actions

export function getCourses() {
    return (dispatch) => {
        dispatch(fetchCourses());

        return fetch('/api/courses')
            .then(res => res.json())
            .then(courses => dispatch(fetchedCourses(courses)));
    };
}

export function getCourse(id) {
    return (dispatch) => {
        dispatch(fetchCourse());

        return fetch(`/api/course/${id}`)
            .then(res => res.json())
            .then(course => dispatch(fetchedCourse(course)));
    };
}

export function getLecturers() {
    return (dispatch) => {
        dispatch(fetchLecturers());

        return fetch('/api/lecturers')
            .then(res => res.json())
            .then(lecturers => dispatch(fetchedLecturers(lecturers)));
    };
}

export function createCourse(course) {
    return (dispatch) => {
        dispatch(createOrSaveCourse());

        return fetch('/api/course/create', {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(res => true);
    };
}

export function saveCourse(course, id) {
    return (dispatch) => {
        dispatch(createOrSaveCourse());

        return fetch(`/api/course/${id}/save`, {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(res => true);
    };
}

export function getStudents() {
    return (dispatch) => {
        dispatch(fetchStudents());

        return fetch('/api/students')
            .then(res => res.json())
            .then(students => dispatch(fetchedStudents(students)));
    };
}

export function searchStudents(search) {
    if (!search) return getStudents();

    return (dispatch) => {
        dispatch(searchStudentsAction(search));

        return fetch(`/api/students/search/${search}`)
            .then(res => res.json())
            .then(students => dispatch(fetchedStudents(students)));
    };
}

export function getStudent(id) {
    return (dispatch) => {
        dispatch(fetchStudents());

        return fetch(`/api/student/${id}`)
            .then(res => res.json())
            .then(student => dispatch(fetchedStudent(student)));
    };
}

export function saveStudent(student, id) {
    return (dispatch) => {
        dispatch(registerOrSaveStudent());

        return fetch(`/api/student/${id}/save`, {
            method: 'POST',
            body: JSON.stringify(student),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(res => true);
    };
}

export function registerStudent(student) {
    return (dispatch) => {
        dispatch(registerOrSaveStudent());

        return fetch('/api/student/register', {
            method: 'POST',
            body: JSON.stringify(student),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(res => true);
    };
}