import {combineReducers, createStore, compose, applyMiddleware} from 'redux';
import thunk from "redux-thunk"
import home from "./reducers/home"
import homeAsyncOpts from "./middlewares/home"

const reducers = combineReducers({
    home
});

// todo: add persistent store caching

const middleware = [thunk, homeAsyncOpts]
const store = createStore(reducers, compose(applyMiddleware(...middleware)))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
