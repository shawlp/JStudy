import React, {Component} from 'react';

// 装饰类，HOC，props是组件，返回一个组件
export const itemFy = hasClick => ItemComponent => {
  return class extends Component {
    render() {
      return (
        <div className={`item ${ItemComponent.classes}`}
          onClick={hasClick ? this.props.onClick : () => {}}
        >
          <ItemComponent {...this.props} />
        </div>
      )
    }
  }
}