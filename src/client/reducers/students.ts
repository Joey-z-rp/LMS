import { FETCH_STUDENTS, FETCHED_STUDENTS, SEARCH_STUDENTS, FETCHED_STUDENT, REGISTER_OR_SAVE_STUDENT } from "../actions";

const initialState = {
    list: [],
    isFetching: false,
    search: '',
    student: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_STUDENTS:
            return { ...state, isFetching: true, list: [], search: '', student: {} };

        case FETCHED_STUDENTS:
            return { ...state, isFetching: false, list: action.students };

        case SEARCH_STUDENTS:
            return { ...state, isFetching: true, search: action.search };

        case FETCHED_STUDENT:
            return { ...state, isFetching: false, student: action.student };

        case REGISTER_OR_SAVE_STUDENT:
            return { ...state, isFetching: true };

        default:
            return state;
    }
}