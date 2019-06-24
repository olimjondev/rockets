import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import {
    FETCH_LAUNCH_PADS,
    GET_YEARS,
    FETCH_ALL_LAUNCHES,
    CONNECTION_ERROR,
    CONNECTION_SUCCESS,
    FILTER_DATA_RECIEVE,
    FILTER_DATA_REQUEST,
    LAUNCHES_RECIEVE,
    LAUNCHES_REQUEST
} from '../types';


const errors = (state = {status: false, message: ''}, action) =>{
    switch(action.type){
        case CONNECTION_ERROR:
            return {...state,
                status: true,
                message: 'Server is not responding. Please retry again'
             };             
        case CONNECTION_SUCCESS:
                return {...state,
                    status: false,
                    message: ''
                 };
        default:
            return state;
    }
}
const fetchLaunches = (state = {
    isFetching: false,
    items: []
}, action) =>{
    switch(action.type){
        case LAUNCHES_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case LAUNCHES_RECIEVE:
            return {
                ...state,
                isFetching: false,
                items: action.payload
            };
        case FILTER_DATA_REQUEST:
                return {
                    ...state,
                    isFetching: true
                };
        case FILTER_DATA_RECIEVE:
                return {
                    ...state,
                    isFetching: false,
                    items: action.payload
                };
        case FETCH_ALL_LAUNCHES:
            return {...state, items: action.payload};
        default:
            return state;
    }
}
const fetchLaunchPads = (state = [], action) =>{
    switch(action.type){
        case FETCH_LAUNCH_PADS:
            return action.payload;
        default:
            return state;
    }
}
const fetchYears = (state = [], action) =>{
    switch(action.type){
        case GET_YEARS:
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    form,
    launchPads: fetchLaunchPads,
    launches: fetchLaunches,
    years: fetchYears,
    allLaunches: fetchLaunches,
    errors
});