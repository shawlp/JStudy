import React, {Component, Suspense} from 'react';

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
      <span onClick={this.onShowMore.bind(this)}>+</span>
      {
        this.state.showSetting 
        ? <Suspense fallback={<div>loading...</div>}>
          <SettingComponent />
        </Suspense>
        : null
      }
    </div>)
  }
}