/**
 * @file entry file
 * @author shaw
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import List from './list';
import Tab from './tab';
import * as components from './components/items';
import TabContext from './tab-context';
import {Provider, connect} from 'react-redux';
import {skeletonHtml} from './skeleton-html';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import Detail from './detail';

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
			showSetting: false,
      loading: true
		};
		this.reactiveList();
	}

	getList() {
		return fetch('//localhost:9000/list')
		    .then(res => res.json());
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

	render() {
    let html =  skeletonHtml ? skeletonHtml : '<div>...loading</div>';
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

	updateList(dispatch) {
		return this.getList()
			.then(({data}) => {
				this.setState({
					loading: false
				}, () => {
					dispatch({
						type: 'PUSH_LIST',
						data
					});
				});
			})
		    .catch(err => console.error(err));
	}

	reactiveList() {   
    this.props.listUpdate(this.updateList.bind(this));

    // 节流
    this.listenScroll(() => {
      this.props.listUpdate(this.updateList.bind(this));
    });
	}

	skip() {   
		console.log('开始跳转!', this.props.history.push);
		this.props.history.push('/detail/' + 'i672763421225964391' + Math.random() * 10);
	}

}

const App = connect(

	function mapStateToProps(state) {
		return {
			list: state.list
		};
	},

	function mapDispatchToProps(dispatch) {
		return {
			listUpdate: task => {
				dispatch(task);
			}
		};
	}
)(Main);

export default () => {

	const TopBar = () => {
		return <div>我是404</div>;
	}

	return (<Switch>
				<Route path="/home" component={App} />
				<Route path="/detail/:id" component={Detail} />
				<Route component={TopBar} />
			</Switch>);
}
