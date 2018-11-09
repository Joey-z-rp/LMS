import { combineReducers }      from 'redux';

import courses from './courses';
import course from './course';
import nav from './nav';

export default combineReducers({
    course,
    courses,
    nav,
});