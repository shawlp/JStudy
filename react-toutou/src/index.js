import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import List from './list';
import Tab from './tab';
import * as components from './components/items';
import TabContext from './tab-context'; 
import store from './store';
import {Provider, connect} from 'react-redux';
// import {Provider, connect} from './fake-react-redux';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Detail from './detail'

const TABS = [
	{
		id: '__all__',
		name: '推荐'
	},
	{
		id: 'video',
		name: '视频'
	}
];

const ALL_TAB = [
	{
		id: '__all__',
		name: '推荐'
	},
	{
		id: 'video',
		name: '视频'
	},
	{
		id: 'sport',
		name: '体育'
	},
	{
		id: 'history',
		name: '历史'
	}
];

const createThrottle = (fn, delay = 100) => {
  let status = 'START';
  return () => {
    if (status === 'WAITING') {
      return;
    }
    status = 'WAITING';
    setTimeout(() => {
      fn && fn();
      status = 'START';
    }, delay);
  }
};

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: [],
      showSetting: false
    };

    this.reactiveList();
  }

  listenScroll(func, THRESHOLD = 50) {
    const throttle = createThrottle(() => {
      func && typeof func === 'function' ? func() : null;
    });

    window.addEventListener('scroll', () => {
      const offsetHeight = document.documentElement.offsetHeight;
      const screenHeight = window.screen.height;
      const scrollY = window.scrollY;
      const gap = offsetHeight - screenHeight - scrollY;
      if (gap < THRESHOLD) {
        throttle()
      }
    })
  }

  reactiveList() {
    this.props.listUpdate(this.updateList.bind(this));

    // 节流
    this.listenScroll(() => {
      this.props.listUpdate(this.updateList.bind(this));
    });
  }

  updateList(dispatch) {
    return this.getList()
      .then(({data}) => {
        dispatch({
          type: 'PUSH_LIST',
          data
        });
      });
  }

  getList() {
    return fetch('http://localhost:9000/list')
      .then(res => res.json());
  }

  skip() {
    console.log('开始跳转！', this.props.history.push);
    this.props.history.push('/detail/' + 'i124567' + Math.random() * 10);
  }

  render() {
    return <div className="container">
      <TabContext.Provider value={ALL_TAB}>
        <Tab tabs={TABS}></Tab>
        <List
          dataSource={this.props.list}
          renderItem={item => {
            const type = item.type.replace(/^\w/, code => code.toUpperCase());
            const ItemComponent = components[type];
            return <ItemComponent 
                    onClick={this.skip.bind(this)}
                    data={item.data}
                  />
          }}
        ></List>
      </TabContext.Provider>
    </div>;
  }
}

const App = connect(
  function mapStateToProps(state) {
    return {
      list: state.list
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      // //使用applyMiddleware(...middleware)中间件，可以让你在dispatch方法中传入函数
      listUpdate: task => {
        dispatch(task)
      }
    }
  }
)(Main);

const AppContainer = () => {
  const TopBar = () => {
    return <div>我是404</div>;
  }

  return (<Router>
    <Switch>
      <Route path="/home" component={App} />
      <Route path="/detail/:id" component={Detail} />
      <Route component={TopBar} />
    </Switch>
  </Router>)
}

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
)