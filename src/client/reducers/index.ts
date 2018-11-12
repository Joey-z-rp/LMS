import { combineReducers }      from 'redux';

import courses from './courses';
import course from './course';
import nav from './nav';
import students from './students';
import enrolOrWithdraw from './enrolOrWithdraw';
import message from './message';
import login from './login';

export default combineReducers({
    course,
    courses,
    nav,
    students,
    enrolOrWithdraw,
    message,
    login,
});