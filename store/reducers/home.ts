import {SET_IMAGES} from "../actions/home";
import {Action, HomeState} from "../types";

const initState : HomeState = {
    images: [],
    pageNum: 0
}

const home : (state: HomeState, action: Action) => HomeState =
    (state = initState, action : Action) => {

    switch (action.type) {
        case SET_IMAGES:
            return {
                ...state,
                images: action.data,
                pageNum: action.pageNum
            }
        default:
            return {...state}
    }
}

export default home;
