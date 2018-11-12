import { LOGIN, LOGIN_FAILED, CLEAR_LOGIN } from '../actions';

const initialState = {
    isLogging: false,
    failed: false,
    err: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state, isLogging: true, failed: false };

        case CLEAR_LOGIN:
            return { ...state, ...initialState };

        case LOGIN_FAILED:
            return { ...state, isLogging: false, failed: true, err: action.err || {} };

        default:
            return state;
    }
}