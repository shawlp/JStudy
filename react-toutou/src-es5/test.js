"use strict";

var _redux = require("redux");

// reducer
var listProcessor = function listProcessor(state, action) {
  console.log('state-action:', state, action);

  if (/INIT/.exec(action.type)) {
    return [{
      name: 'yuanxin'
    }];
  } else if (action.type === 'PUSH_LIST') {
    return [action.data];
  }

  return state;
}; // store


var store = (0, _redux.createStore)(listProcessor);
console.log('store-----11:::', store.getState());
store.subscribe(function () {
  console.log('in-subscribe:::', store.getState());
}); // action
// store.dispatch({
// 	type: 'PUSH_LIST',
// 	data: {
// 		title: '标题'
// 	}
// });
// console.log('store:::', store.getState());
// ----------------------------------------------
// var store = {
//		name: 'yuanxin'
// };
// function changeList(store, action) {
// 	store.state = [
// 		action.data
// 	];
// }
// console.log('store-----11:::', store.state);
// changeList({
// 	data: {
// 		title: '标题'
// 	}
// });
// console.log('store:::', store.state;