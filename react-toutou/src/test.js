import {createStore} from 'redux';

const listProcessor = (state, action) => {
  console.log('state-action:', state, action);
  if (/INIT/.exec(action.type)) {
    return [{
      name: 'yuanxin'
    }]
  } else if (action.type === 'PUSH_LIST') {
    return [
      action.data
    ]
  }
  return state;
}

const store = createStore(listProcessor);

store.subscribe(function() {
  console.log('in-subsribe::', store.getState());
});