import { combineReducers } from 'redux';
import counterSlice from '../containers/counter/counterSlice';

const appReducer = combineReducers({
    counter: counterSlice,
});

export default appReducer;
