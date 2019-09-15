/**
 * @file 小程序核心逻辑层
 * 
 */
(function (global) {
	let wx = {};
	let classMap = {}; // 存放页面的路由

	class Logic {
        // 初始化视图的默认参数，视图索引，页面跳转的路径
		init() {
			this.uniqIndex = 0;
			const firstPageUri = window.appJson.pages[0];
			this.navigateTo(firstPageUri);
		}

        // 生成唯一的视图id
		_generateUniqId() {
			return 'id' + (this.uniqIndex++);
		}

        // 定义跳转的路由功能
		navigateTo(uri) {
			const PageClass = classMap[uri];
			const page = new PageClass(this._generateUniqId(), uri);
		}

	}

	class PageBase {

		constructor(id, uri) {
			this.uri = uri;
			this.id = id;
			this._initData();
			this._render()
				.then(() => {
					global.__bridge.postMessage(this.id, {
						type: 'initSet',
						data: this.data
					});
				});
		}

		_initData() {
			this.data = JSON.parse(JSON.stringify(this.data || {}));
		}

        // 创建视图的方法
		_render() {
			return global.__bridge.createView(this.id)
				.then(frame => {
					this.$el = frame;
				});
		}

        // 提供改变特定视图中的数据方法
		setData() {
			global.__bridge.postMessage(this.id, {
				type: 'setData',
				data: this.data
			});
		}
	}

	const createPageClass = options => {
		class Page extends PageBase {
			constructor(...args) {
				super(...args);
			}
		}
		Object.assign(Page.prototype, options);
		return Page;
	};

	const Page = (uri, options) => {
		classMap[uri] = createPageClass(options);
	};

	global.logic = new Logic();
	global.Page = Page;
})(window);