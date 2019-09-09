/** 
 * @file router
 * @author shaw
 */
export default class VueRouter {
  constructor(options) {
    // 记录下配置项
    this.routes = options.routes;
    // 工具
    this.history = new History();
    this.history.listen(newHash => {
      this.vm.$forceUpdate();
    });
  }

  push({path}) {
    this.history.push(path);
  }

  static install(Vue, options) {
    Vue.mixin({
      created() {
        if (this.$options.router) {
          this.$options.router.vm = this;

          this.$router = this.$options.router;
        } else {
          this.$router = this.$parent.$router;
        }
      }
    });

    Vue.component('router-view', {
      functional: true,
      render(createElement, {props, children, parent}) {
        const currentHash = location.hash;
        const router = parent.$router;
        console.log('$currentHash:', currentHash, router.routes);
        const currentRoute = matcher(currentHash, router.routes);
        console.log('currentRoute', currentRoute);
        // this.$parent.$options.router.routes
        // 拿到当前路径下应该对应的component
        return createElement(currentRoute.component);
      }
    })

    Vue.component('router-link', {
      render(createElement) {
        return createElement('span', {
          on: {
            click: this.clicking
          }
        }, this.$slots.default)
      },
      methods: {
        clicking() {
          window.history.back();
          // this.$parent.$router.back()
        }
      }
    })
  }
}

const matcher = (path, routesConfig) => {
  return routesConfig
    .find(route => {
      return route.path === path.replace(/^#/, '');
    });
}

class History {
  listen(callback) {
    window.addEventListener('hashchange', () => {
      callback && callback(window.location.hash);
    });
  }

  push(path) {
    window.location.hash = '#' + path;
  }
}