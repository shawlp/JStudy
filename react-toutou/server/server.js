var http = require('http');
var utils = require('./utils');
var apis = require('./apis');

var TEMPLATE_ROOT_DIR = "F:/jsStudy/react-toutou/dist/html/";
var STATIC_DIR = "F:/jsStudy/react-toutou/dist/static/";

function fab(num) {
    var sum = 0;
    for (var i = 0; i < num; i++) {
        sum *= i;
    }
    return sum;
}

var cache = utils.createCacher(5 * 1000 * 1000);

var actionMap = [
    {
        uri: /^\/home/,
        handler: function (req, res) {

            const cacheStr = cache(TEMPLATE_ROOT_DIR + '/index.html');
            // if (cacheStr) {
            //     console.log('use cache!!!');
            //     res.write(cacheStr);
            //     res.end();
            //     return ;
            // }

            // 获取并渲染了html字符串
            utils.readContent(TEMPLATE_ROOT_DIR, '/index.html')
                .then(content => {
                    if (true) {
                        apis.getList().then(listStr => {
                            const listObj = apis.convert(listStr);
                            const reactTpl = utils.renderSSR({
                                list: listObj.data
                            });
                            content = content
                                .replace('{%content%}', reactTpl)
                                .replace('{%listData%}', JSON.stringify({
                                    list: listObj.data
                                }));
                            cache(TEMPLATE_ROOT_DIR + '/index.html', content)
                            res.write(content);
                            res.end();
                        });
                    }
                    else {
                        apis.getList().then(listStr => {
                            const listObj = apis.convert(listStr);
                            // const reactTpl = utils.renderSSR({
                            //     list: listObj.data
                            // });
                            content = content
                                .replace('{%content%}', '')
                                .replace('{%listData%}', JSON.stringify({
                                    list: listObj.data
                                }));
                            cache(TEMPLATE_ROOT_DIR + '/index.html', content)
                            res.write(content);
                            res.end();
                        });
                    }
                });
        }
    },
    {
        uri: /^\/static/,
        handler: function (req, res) {
            // 从path上，获取一下静态文件的路径
            var filepath = req.url.replace(/^\/static/, '').replace(/\?.*$/, '');
            utils.readContent(STATIC_DIR, filepath)
                 .then(content => {
                    res.write(content);
                    res.end();
                 });
        }
    },
    {
        uri: /^\/list\/?$/,
        handler: function (req, res) {
            apis.getList().then(content => {
                const listObj = apis.convert(content);
                res.write(JSON.stringify(listObj));
                res.end();
            });
        }
    }
];

// console.log('process', process.memoryUsage());

function init() {

    var server = http.createServer((req, res) => {
        // 收到请求 RPC
        const actions = actionMap.filter(({uri}) => uri.exec(req.url));
        actions.forEach(action => action.handler(req, res));
    });

    server.listen(9000);    
}

module.exports.init = init;