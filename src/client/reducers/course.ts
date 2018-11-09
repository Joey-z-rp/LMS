import { FETCH_COURSE, FETCHED_COURSE, FETCH_LECTURERS, FETCHED_LECTURERS, CREATE_OR_SAVE_COURSE } from "../actions";

const initialState = {
    course: {},
    lecturerList: [],
    isFetching: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_COURSE:
            return { ...state, isFetching: true, course: {} };

        case FETCHED_COURSE:
            return { ...state, isFetching: false, course: action.course };

        case FETCH_LECTURERS:
            return { ...state, isFetching: true, lecturerList: [] };

        case FETCHED_LECTURERS:
            return { ...state, isFetching: false, lecturerList: action.lecturers };

        case CREATE_OR_SAVE_COURSE:
            return { ...state, isFetching: true };

        default:
            return state;
    }
}