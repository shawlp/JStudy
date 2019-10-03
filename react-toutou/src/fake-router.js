/**
 * @file react-router-dom
 */
import React, {Component} from 'react';

/**
 * 创建一个react的context的工厂方法
 */
const createContext = () => {
    let context = React.createContext(null);
    return context;
};
/**
 * @description 创建一个location对象
 * @param [String] {path} - 路径
 * @param [Object] {state} - 需要透传的对象 
 */
const  createLocation = (path, state) => {
    let pathInfo = /^([^\?]*?)(\?[^#]*?)?(\#.*?)?$/.exec(path);
    return {
        pathname: pathInfo[1],
        search: pathInfo[2],
        hash: pathInfo[3],
        state
    } 
};

let eventEmitter = {
    listener: [],
    notify(...args) {
        this.listener.forEach(listener => listener(...args));
    },
    listen(func) {
        this.listener.push(func);
    }
};

const getDOMLocation = (state) => {
    let window$location = window.location;
    let pathname = window$location.pathname;
    let search = window$location.search;
    let hash = window$location.hash;
    return createLocation(`${pathname}${search}${hash}`, state);
}

const createBrowserHistory = () => {
    const listen = (func) => {
        eventEmitter.listen(func);
    };

    const DOMListen = (func) => {
        window.addEventListener('popstate', func);
    };

    DOMListen((event) => {
        // 有location变化
        let action = 'POP';
        let location = getDOMLocation(event.state);

        // 催动界面变化，设置新的状态
        setState({
            location,
            action
        })
    });

    const push = (path, state) => {
        let action = 'PUSH';
        let location = createLocation(path, state);
        window.history.pushState({
            state
        }, null, path);
        // 催动界面变化，设置新的状态
        setState({
            location,
            action
        })
    };

    const setState = (nextState) => {
        Object.assign(history, nextState);
        eventEmitter.notify(history);
    };

    return {
        push,
        listen
    };
}

let RouterContext = createContext();

export class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: '',
            location: getDOMLocation()
        };
        props.history.listen(({action, location}) => {
            this.setState({
                action,
                location
            })
        })
    }

    render() {
        const contextValue = {
            history: this.props.history,
            location: this.state.location
        };
        return <RouterContext.Provider value={contextValue}>
            {this.props.children}
        </RouterContext.Provider>
    }
}

export class BrowserRouter extends Component {
    constructor(...args) {
        super(...args);
        this.history = createBrowserHistory();
    }
    render() {
        return (<Router history={this.history}>
            {this.props.children}            
        </Router>)
    }
}

export class Switch extends Component {

}

const matcher = (pathname, location) => {
    return (new RegExp(pathname)).exec(location.pathname);
}

export class Route extends Component {
    static contextType = RouterContext;
    render() {
        const DynamicComponent = this.props.component;
        let match = matcher(this.props.path, this.context.location);
        return (<React.Fragment>
            {
                match ?
                <DynamicComponent {...this.context}/> : null
            }
        </React.Fragment>)
    }
}

export class Link extends Component {
    static contextType = RouterContext;
    render() {
        return <a onClick={this.navigateTo.bind(this)}>
            {this.props.children}
        </a>
    }
    navigateTo() {
        console.log('this.context', this.context);
    }
}

