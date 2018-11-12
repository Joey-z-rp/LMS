import { SET_MESSAGE, HIDE_MESSAGE } from '../actions';

const initialState = {
    showMessage: false,
    title: '',
    content: '',
    type: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_MESSAGE:
            return {
                ...state,
                showMessage: true,
                title: action.message.title,
                content: action.message.content,
                type: action.message.type,
            };

        case HIDE_MESSAGE:
            return { ...state, ...initialState };

        default:
            return state;
    }
}