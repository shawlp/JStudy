import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

const toutiaProcessor = (state = {list: []}, action) => {
  if (action.type === 'PUSH_LIST') {
    return {
      ...state,
      list: state.list.concat(action.data)
    }
  }
  return state;
}

const reduxPromise = ({dispatch, getState}) => next => action => {
	if (typeof action.then === 'function') {
		return action.then(next);
	}
	return next(action);
};

// 多个reducer可以使用combineReducers(reducers)，
//使用applyMiddleware(...middleware)中间件，可以让你在dispatch方法中传入函数
const store = createStore(toutiaProcessor, applyMiddleware(thunkMiddleware));

export default store;
