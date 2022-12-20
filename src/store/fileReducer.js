const defaultState = {
    correspondence: {
        id: 111,
        messages: []
    },
    file: null,
    error: '',
    file_id: null,
    hash: ''
}

const GET_FILE = "GET_FILE"
const LOAD_FILE = "LOAD_FILE"
const SET_HASH = "SET_HASH"
const ADD_MESSAGE = "ADD_MESSAGE"

export const fileReducer = (state = defaultState, action) => {
    switch (action.type){
        case GET_FILE:
            return {...state, file_id: action.payload.json.file_id && action.payload.json.file_id, error:  action.payload.json.error && action.payload.json.error}
        case SET_HASH:
            return {...state, hash: action.payload}
        case ADD_MESSAGE:
            return {
                correspondence: {
                    id: state.correspondence.id,
                    messages: [action.payload.file_id ? [...state.correspondence.messages, ...[action.payload]] : [...state.correspondence.messages]]
                }
            }
        case LOAD_FILE:
            return {...state, ...action.payload.json}
        default:
            return state
    }
}

export const getFile = (payload) => ({type: GET_FILE, payload})
export const defineHash = (payload) => ({type: SET_HASH, payload})
export const setMessage = (payload) => ({type: ADD_MESSAGE, payload})
