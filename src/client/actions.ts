import fetch from './lib/fetch';

// action types
​
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const CLEAR_COURSE = 'CLEAR_COURSE';
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
export const FETCH_ENROL_OR_WITHDRAW = 'FETCH_ENROL_OR_WITHDRAW';
export const FETCHED_ENROL_OR_WITHDRAW_DATA = 'FETCHED_ENROL_OR_WITHDRAW_DATA';
export const SET_MESSAGE = 'SET_MESSAGE';
export const HIDE_MESSAGE = 'HIDE_MESSAGE';
export const LOGIN = 'LOGIN';
export const CLEAR_LOGIN = 'CLEAR_LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';

// action creators
​
export function toggleSidebar() {
    return { type: TOGGLE_SIDEBAR };
}

export function clearCourse() {
    return { type: CLEAR_COURSE };
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

export function fetchEnrolOrWithdraw() {
    return { type: FETCH_ENROL_OR_WITHDRAW };
}

export function fetchedEnrolOrWithdrawData(data) {
    return { type: FETCHED_ENROL_OR_WITHDRAW_DATA, data };
}

export function setMessage(message) {
    return { type: SET_MESSAGE, message };
}

export function hideMessage() {
    return { type: HIDE_MESSAGE };
}

export function loginAction() {
    return { type: LOGIN };
}

export function clearLogin() {
    return { type: CLEAR_LOGIN };
}

export function loginFailed(err?) {
    return { type: LOGIN_FAILED, err };
}

// async actions

export function getCourses() {
    return (dispatch) => {
        dispatch(fetchCourses());

        return fetch('/api/courses')
            .then(courses => dispatch(fetchedCourses(courses)))
            .catch(err => dispatch(setMessage({
                type: 'error',
                content: err.message,
            })));
    };
}

export function getCourse(id) {
    return (dispatch) => {
        dispatch(fetchCourse());

        return fetch(`/api/course/${id}`)
            .then(course => dispatch(fetchedCourse(course)))
            .catch(err => dispatch(setMessage({
                type: 'error',
                content: err.message,
            })));
    };
}

export function getLecturers() {
    return (dispatch) => {
        dispatch(fetchLecturers());

        return fetch('/api/lecturers')
            .then(lecturers => dispatch(fetchedLecturers(lecturers)))
            .catch(err => dispatch(setMessage({
                type: 'error',
                content: err.message,
            })));
    };
}

export function createCourse(course) {
    return (dispatch) => {
        dispatch(createOrSaveCourse());

        return fetch('/api/course/create', {
            method: 'POST',
            body: JSON.stringify(course),
        })
            .then(res => {
                dispatch(setMessage({
                    type: 'success',
                    title: 'COURSE CREATED',
                    content: `Successfully created coures ${res.name}`,
                }));
                return true;
            })
            .catch(err => {
                dispatch(setMessage({
                    type: 'error',
                    content: err.message,
                }))
            });
    };
}

export function saveCourse(course, id) {
    return (dispatch) => {
        dispatch(createOrSaveCourse());

        return fetch(`/api/course/${id}/save`, {
            method: 'POST',
            body: JSON.stringify(course),
        })
            .then(res => {
                dispatch(setMessage({
                    type: 'success',
                    title: 'COURSE UPDATED',
                    content: `Successfully updated coures ${res.name}`,
                }));
                return true;
            })
            .catch(err => {
                dispatch(setMessage({
                    type: 'error',
                    content: err.message,
                }))
            });
    };
}

export function getStudents() {
    return (dispatch) => {
        dispatch(fetchStudents());

        return fetch('/api/students')
            .then(students => dispatch(fetchedStudents(students)))
            .catch(err => dispatch(setMessage({
                type: 'error',
                content: err.message,
            })));
    };
}

export function searchStudents(search) {
    if (!search) return getStudents();

    return (dispatch) => {
        dispatch(searchStudentsAction(search));

        return fetch(`/api/students/search/${search}`)
            .then(students => dispatch(fetchedStudents(students)))
            .catch(err => dispatch(setMessage({
                type: 'error',
                content: err.message,
            })));
    };
}

export function getStudent(id) {
    return (dispatch) => {
        dispatch(fetchStudents());

        return fetch(`/api/student/${id}`)
            .then(student => dispatch(fetchedStudent(student)))
            .catch(err => dispatch(setMessage({
                type: 'error',
                content: err.message,
            })));
    };
}

export function saveStudent(student, id) {
    return (dispatch) => {
        dispatch(registerOrSaveStudent());

        return fetch(`/api/student/${id}/save`, {
            method: 'POST',
            body: JSON.stringify(student),
        })
            .then(res => {
                dispatch(setMessage({
                    type: 'success',
                    title: 'STUDENT UPDATED',
                    content: `Successfully updated student ${res.name}`,
                }));
                return true;
            })
            .catch(err => {
                dispatch(setMessage({
                    type: 'error',
                    content: err.message,
                }))
            });
    };
}

export function registerStudent(student) {
    return (dispatch) => {
        dispatch(registerOrSaveStudent());

        return fetch('/api/student/register', {
            method: 'POST',
            body: JSON.stringify(student),
        })
            .then(res => {
                dispatch(setMessage({
                    type: 'success',
                    title: 'STUDENT REGISTERED',
                    content: `Successfully registered student ${res.name}`,
                }));
                return true;
            })
            .catch(err => {
                dispatch(setMessage({
                    type: 'error',
                    content: err.message,
                }))
            });
    };
}

export function getEnrolData(courseId?, studentId?) {
    return (dispatch) => {
        dispatch(fetchEnrolOrWithdraw());

        return fetch(`/api/enrol?courseId=${courseId}&studentId=${studentId}`)
            .then(data => dispatch(fetchedEnrolOrWithdrawData(data)))
            .catch(err => dispatch(setMessage({
                type: 'error',
                content: err.message,
            })));
    };
}

export function enrolStudent(courseId, studentId) {
    return (dispatch) => {
        dispatch(fetchEnrolOrWithdraw());

        return fetch('/api/enrol', {
            method: 'POST',
            body: JSON.stringify({ courseId, studentId }),
        })
            .then(res => {
                dispatch(setMessage({
                    type: 'success',
                    title: 'ENROLLED',
                    content: `Successfully enrolled`,
                }));
                return true;
            })
            .catch(err => {
                dispatch(setMessage({
                    type: 'error',
                    content: err.message,
                }))
            });
    };
}

export function getWithdrawData(courseId?, studentId?) {
    return (dispatch) => {
        dispatch(fetchEnrolOrWithdraw());

        return fetch(`/api/withdraw?courseId=${courseId}&studentId=${studentId}`)
            .then(data => dispatch(fetchedEnrolOrWithdrawData(data)))
            .catch(err => dispatch(setMessage({
                type: 'error',
                content: err.message,
            })));
    };
}

export function withdrawStudent(courseId, studentId) {
    return (dispatch) => {
        dispatch(fetchEnrolOrWithdraw());

        return fetch('/api/withdraw', {
            method: 'POST',
            body: JSON.stringify({ courseId, studentId }),
        })
            .then(res => {
                dispatch(setMessage({
                    type: 'success',
                    title: 'WITHDRAWED',
                    content: `Successfully withdrawed`,
                }));
                return true;
            })
            .catch(err => {
                dispatch(setMessage({
                    type: 'error',
                    content: err.message,
                }))
            });
    };
}

export function deleteCourse(id) {
    return (dispatch) => {
        return fetch(`/api/course/delete/${id}`, {
            method: 'DELETE',
        })
            .then(res => {
                dispatch(setMessage({
                    type: 'success',
                    title: 'COURSE DELETED',
                    content: `Successfully deleted course ${res.name}`,
                }));
                return true;
            })
            .catch(err => {
                dispatch(setMessage({
                    type: 'error',
                    content: err.message,
                }))
            });
    };
}

export function deleteStudent(id) {
    return (dispatch) => {
        return fetch(`/api/student/delete/${id}`, {
            method: 'DELETE',
        })
            .then(res => {
                dispatch(setMessage({
                    type: 'success',
                    title: 'STUDENT DELETED',
                    content: `Successfully deleted student ${res.name}`,
                }));
                return true;
            })
            .catch(err => {
                dispatch(setMessage({
                    type: 'error',
                    content: err.message,
                }))
            });
    };
}

export function login(email, password) {
    return (dispatch) => {
        dispatch(loginAction());

        return fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        })
            .then((res) => {
                if (res.status === 'successful') {
                    dispatch(clearLogin());
                    return true;
                }
                dispatch(loginFailed());
            })
            .catch(err => {
                dispatch(loginFailed(err))
            });
    };
}
