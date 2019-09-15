/**
 * @file 小程序核心逻辑层
 * 
 */
class Bridge {
    // 创建多个视图
    createView(id) {
        return new Promise(resolve => {
            let frame = document.createElement('iframe');
            frame.src = './view.html';
            frame.id = id;
            frame.onload = () => resolve(frame);
            document.body.appendChild(frame);
        });   
    }   

    /**
     * 逻辑层向视图层发消息
     * @param {String} [id] - 视图的唯一标识
     * @param {Object} [params] - 需要set的数据
     */ 
    postMessage(id, params) {
        // 向特定的视图发送信息，改变视图内容
        const target = document.querySelector('#' + id);
        target.contentWindow && target.contentWindow.postMessage(params);
    }

    // 视图层监听message事件，执行回调，变更数据
    onMessage(callback) {
        window.addEventListener('message', function (event) {
            callback && callback(event.data);
        });
    }
}

window.__bridge = new Bridge();