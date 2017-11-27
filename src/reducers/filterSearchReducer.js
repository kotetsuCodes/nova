import * as types from '../actions/actionTypes';

const filterSearch = "";


export default function filterSearchReducer(state = filterSearch, action) {
    switch(action.type) {
        case types.SET_FILTER_KEYWORD:
            return action.searchTerm;
        default:
            return state;
    }
}