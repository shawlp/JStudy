import React, {Component} from 'react';
import {Provider, connect} from 'react-redux';
import {BrowerRouter, Route, Link, withRouter} from 'react-router-dom';

class content extends Component {
  render() {
    const {match, location, history, list} = this.props;
    console.log('渲染啦！', list);
    return (<div>内容</div>);
  }
}

// withRouter使得组件具有route相关的参数
const ContentView = withRouter(connect(
  state => {
    return {
      list: state.list
    };
  }
)(content));

export default class Detail extends Component {
  render() {
    return (<div>
      <ContentView />
      <Link to={"/detail/i1245678" + Math.random() * 10}>跳转内容</Link>
      我是详情页，我的id是：{this.props.match.params.id}
    </div>)
  }
}