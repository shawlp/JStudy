import React, {Component, Suspense} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';

// 切换路由时，懒加载
const SettingComponent = React.lazy(() => import('./setting'));

export default class Tab extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      showSetting: false
    };
  }

  onShowMore() {
    this.setState({
      showSetting: true
    })
  }

  render() {
    const {dataSource = [], renderItem} = this.props;
    return (<div>
      {
        this.props.tabs.map(tab => {
          return <span key={tab.name}>{tab.name}</span>
        })
      }
      <Link to="/home/setting">+</Link>
      <Route path="/home/setting" render={props => {
        return <Suspense fallback={<div>loading...</div>}>
          <SettingComponent />
        </Suspense>
      }} />
    </div>)
  }
}