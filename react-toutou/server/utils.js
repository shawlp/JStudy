/**
 * @file
 * @author shaw
 */
var React = require('react');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const hook = require('css-modules-require-hook/preset');
const App = require('../src-es5/app').default;
const createStore = require('../src-es5/store').default;
const {Provider, connect} = require('react-redux');
var fs = require('fs');

function mockBrowserApis() {
	var apis = {
		fetch: () => Promise.reject()
	};
	for (var name in apis) {
		global[name] = apis[name];
	}
}

mockBrowserApis();

function renderSSR(storeData) {
	const htmlStr = renderToString(
		React.createElement(
			StaticRouter,
			{
				location: "/home",
				context: {}
			},
			React.createElement(
				Provider,
				{
					store: createStore(storeData)
				},
				React.createElement(App)
			)
		)
	);
	return htmlStr;
}


function createCacher(maxSize) {
	var cacheMap = {};
	var usedSize = 0;
	return function cache(key, value) {
		if (!value) {
			return cacheMap[key];
		}
		const contentSize = value.length;
		if (usedSize + contentSize < maxSize) {
			cacheMap[key] = value;
			usedSize += contentSize;
		}
	}
}

// 渲染函数
function readContent(ROOT_DIR, path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(ROOT_DIR + path, 'utf-8', function (err, content) {
            if (err) {
                reject(err);
            }
            resolve(content);
        });
    });
}

module.exports = {
	readContent: readContent,
	renderSSR: renderSSR,
	createCacher: createCacher
};