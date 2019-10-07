import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import List from './list';
import Tab from './tab';
import * as components from './components/items';
import TabContext from './tab-context'; 
import store from './store';
import {Provider, connect} from 'react-redux';
// import {Provider, connect} from './fake-react-redux';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
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

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: [],
      showSetting: false,
      loading: true
    };

    this.reactiveList();
  }

  reactiveList() {
    this.props.listUpdate(this.updateList.bind(this));

    window.onscroll = () => {
      this.props.listUpdate(this.updateList.bind(this));
    }
  }

  updateList(dispatch) {
    return this.getList()
      .then(({data}) => {
        this.setState({
          loading: false
        });
        dispatch({
          type: 'PUSH_LIST',
          data
        });
      });
  }

  getList() {
    return fetch('http://localhost:9000/list')
      .then(res => {
        return new Promise(resolve => {
          setTimeout(() => resolve(res), 3000)
        })
      })
      .then(res => res.json());
  }

  skip() {
    console.log('开始跳转！', this.props.history.push);
    this.props.history.push('/detail/' + 'i124567' + Math.random() * 10);
  }

  render() {
    let html =  '<div>...loading</div>';
    return <div className="container">
      {
        this.state.loading ?
        <div dangerouslySetInnerHTML={{__html: html}}></div>
        : 
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
      }

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
      listUpdate: task => {
        dispatch(task)
      }
    }
  }
)(Main);

export default () => {
  const TopBar = () => {
    return <div>我是404</div>;
  }

  return (<Provider store={store}>
    <Switch>
      <Route path="/home" component={App} />
      <Route path="/detail/:id" component={Detail} />
      <Route component={TopBar} />
    </Switch>
  </Provider>)
}