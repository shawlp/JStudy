import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link, Switch} from './fake-router';

class Main extends Component {
	
	render() {
		return <div onClick={this.skip.bind(this)}>
				我是首页
				<Link to="/detail/i6727875488498319878">跳转</Link>
			</div>;
	}

	skip() {
		this.props.history.push('/detail/i6727875488498319878');
	}
}

class Detail extends Component {
	render() {
		console.log('poropss:::', this.props);
		return <div>我是详情页</div>;
	}
}

class AppContainer extends Component {
	render() {
		return (<BrowserRouter>
				<Route path="/home" component={Main} />
				<Route path="/detail" component={Detail} />
			</BrowserRouter>);	
	}
}

ReactDOM.render(
	<AppContainer />,
	document.getElementById('app')
);