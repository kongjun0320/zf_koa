const EventEmitter = require('events');
const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class Application extends EventEmitter {
  constructor(props) {
    super(props);
    // 每个应用之间，这个 context 应该不是一个，通过 Object.create 每次创建应用都创建一个全新的对象，可以找到此扩展，但是新增属性时不会影响此方法
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }

  use(fn) {
    this.middleware = fn;
  }

  handleRequest = (req, res) => {
    let ctx = Object.create(this.context);
    let request = Object.create(this.request);
    // let response = Object.create(this.response)
    ctx.req = req;
    ctx.res = res;
    ctx.request = request;
    ctx.response = response;
    ctx.request.req = req;
    // 处理请求
    this.middleware(ctx);
  };

  listen(...args) {
    const server = http.createServer(this.handleRequest);
    server.listen(...args);
  }
}

module.exports = Application;
