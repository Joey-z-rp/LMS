import { FETCH_COURSES, FETCHED_COURSES } from "../actions";

const initialState = {
    list: [],
    isFetching: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_COURSES:
            return { ...state, isFetching: true, list: [] };

        case FETCHED_COURSES:
            return { ...state, isFetching: false, list: action.courses };

        default:
            return state;
    }
}