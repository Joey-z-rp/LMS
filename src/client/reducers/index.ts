import { combineReducers }      from 'redux';

import courses from './courses';
import nav from './nav';

export default combineReducers({
    courses,
    nav,
});