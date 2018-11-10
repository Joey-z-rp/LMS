import { FETCH_ENROL_OR_WITHDRAW, FETCHED_ENROL_OR_WITHDRAW_DATA } from "../actions";

const initialState = {
    isFetching: false,
    courses: [],
    students: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ENROL_OR_WITHDRAW:
            return { ...state, isFetching: true };

        case FETCHED_ENROL_OR_WITHDRAW_DATA:
            return {
                ...state,
                isFetching: false,
                courses: action.data.courses,
                students: action.data.students,
            };

        default:
            return state;
    }
}