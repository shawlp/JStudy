import React, {Component} from 'react';
import {itemFy} from './decorators';
import Echarts from './echarts';

@itemFy()
export default class Agriculture extends Component {
  static classess = 'agriculture';

  render() {
    return (
      <div className="content">
        农业
        <Echarts />
      </div>
    )
  }
}