import * as types from './actionTypes';

export function setFilterSearch(searchTerm) {
    return {type: types.SET_FILTER_KEYWORD, searchTerm};
}