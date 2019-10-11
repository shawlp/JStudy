// 发请求
var https = require('https');

const convert = function convert(listStr) {
    var bodyObj = JSON.parse(listStr);
    var convertedObj = {
        data: bodyObj.data.map(item => {
            let type = 'default';
            let imageList = [];
            if (item.image_list.length >= 3) {
                type = 'multiplePic';
                imageList = item.image_list.map(image => image.url);
            }
            else if (item.image_url) {
                type = 'singlePic';
                imageList = [item.image_url];
            }
            return {
                "type": type,
                "data": {
                    "articleUrl": item.article_url,
                    "title": item.title,
                    "id": "i6727851773362438664",
                    "articleType": "video",
                    "imageList": imageList
                }
            };
        })
    }
    return convertedObj;
}

const getList = function getList() {
    return new Promise(function (resolve ,reject) {
        https.get(
            'https://m.toutiao.com/list/?tag=__all__&ac=wap&count=20&format=json_raw',
            function (list) {
                let body = '';
                list
                    .on('data', chunk => {
                        body += chunk;
                    })
                    .on('end', () => {
                        resolve(body);
                    });
            }
        );
    });
};

module.exports = {
    getList: getList,
    convert: convert
};