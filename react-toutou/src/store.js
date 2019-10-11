import { createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

const toutiaoProcessor = (state, action) => {
	if (action.type === 'PUSH_LIST') {
		return {
			...state,
			list: state.list.concat(action.data)
		}
	}
	return state;
};

const reduxPromise = ({dispatch, getState}) => next => action => {
	if (typeof action.then === 'function') {
		return action.then(next);
	}
	return next(action);
};

export default (initState = {list: []}) => {
	return createStore(toutiaoProcessor, initState, applyMiddleware(thunkMiddleware));
};