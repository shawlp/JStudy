/** 
 * @file 工具
 * @author shaw
 */
import echarts from 'echarts';

// 节流，应用场景：在一段时间频繁触发某动作，只会执行一次动作
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
}

// 防抖，应用场景：一个动作在某个时间段执行，再次执行会打断上一次执行
const createDebounce = (fn, delay = 100) => {
  let timer = null;
  return args => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn && fn();
    }, delay);
  }
}

export const reachBottomNotify = {
  install: (Vue, options) => {
    Vue.mixin({
      data() {
        const data = {
          scrollQueue: []
        };
        return this.onReachBottom ? data : {}
      },
      created() {
        if (typeof this.onReachBottom === 'function') {
          this.scrollQueue.push(() => {
            this.onReachBottom();
          });
          this._listenScroll()
        }
      },
      methods: {
        _listenScroll() {
          const THRESHOLD = 50;
          const throttle = createThrottle(() => {
            this.scrollQueue.forEach(func => func());
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
      }
    })
  }
};

export const functionalTool = {
  install: (Vue, options) => {
    Vue.mixin({
      methods: {
        createDebounce,
        createThrottle
      }
    });
    Vue.component('echarts', {
      props: {
        width: {
          type: Number,
          default: -1
        },
        height: {
          type: Number,
          default: -1
        },
        options: {
          type: Object,
          default: {}
        }
      },
      render(createElement) {
        return createElement(
          'div',
          {
            attrs: {
              id: this.randomId
            },
            style: this.canvasStyle,
            directives: [
              {
                name: 'echarts'
              }
            ]
          }
        )
      },
      mounted() {
        this.draw();
        this.$watch('options', options => {
          this.draw();
        })
      },
      computed: {
        randomId() {
          return 'echarts-' + Math.floor(Math.random() * 10);
        },
        canvasStyle() {
          return {
            height: this.height === -1 ? '100%' : this.height + 'px',
            width: this.width === -1 ? '100%' : this.width + 'px'
          }
        },
      },
      methods: {
        receiveEchartsContext(context) {
          this.echartsContext = context;
        },
        draw() {
          const options = this.options;
          this.echartsContext.setOption(options);
        }
      }
    });

    Vue.directive('echarts', {
      inserted: (el, binding, vnode) => {
        const charts = echarts.init(el);
        vnode.context.receiveEchartsContext && vnode.context.receiveEchartsContext(charts);
      }
    })
  }
}

