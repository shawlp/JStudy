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

function getDefaultState() {
  return global.appData || {};
}

const store = createStore(toutiaProcessor, getDefaultState(), applyMiddleware(thunkMiddleware));

export default store;
