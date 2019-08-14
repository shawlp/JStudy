/**
 * @file 大图的组件
 * @author shaw
 */
import Component from './component';

export default class BigPic extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {data} = this.props;
    return `<div class="item big-pic">
        <div class="content">
            <span y-on:click="clicking">
                ${data.title}
            </span>
        </div>
        <img src="${data.imageList[0]}" />
    </div>`;
  }
}