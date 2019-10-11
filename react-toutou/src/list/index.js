/**
 * @file entry file
 * @author shaw
 */

import React, {Component} from 'react';

// render props
export default class List extends Component {
	render() {
		const {dataSource = [], renderItem} = this.props;
		return (<div>
				{
					dataSource.map(renderItem)
				}
			</div>);
	}
}