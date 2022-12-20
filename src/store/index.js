import {createStore, applyMiddleware} from "redux"
import {fileReducer} from "./fileReducer";
import thunk from "redux-thunk";


export const store = createStore(fileReducer, applyMiddleware(thunk))
