import { combineReducers }      from 'redux';

import courses from './courses';
import course from './course';
import nav from './nav';
import students from './students';

export default combineReducers({
    course,
    courses,
    nav,
    students,
});