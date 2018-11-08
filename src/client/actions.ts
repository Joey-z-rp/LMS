import fetch from 'cross-fetch';

// action types
​
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const FETCH_COURSES = 'FETCH_COURSES';
export const FETCHED_COURSES = 'FETCHED_COURSES';
​
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

// async actions

export function getCourses() {
    return (dispatch) => {
        dispatch(fetchCourses());

        return fetch('/api/courses')
            .then(res => res.json())
            .then(courses => dispatch(fetchedCourses(courses)));
    };
}