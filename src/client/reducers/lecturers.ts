import { FETCH_LECTURERS, FETCHED_LECTURERS } from "../actions";

const initialState = {
    isFetching: false,
    lecturers: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_LECTURERS:
            return { ...state, isFetching: true, lecturers: [] };

        case FETCHED_LECTURERS:
            return { ...state, isFetching: false, lecturers: action.lecturers };

        default:
            return state;
    }
}