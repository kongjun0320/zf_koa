const response = {
  _body: '',

  set body(value) {
    this.res.statusCode = 200;
    // 每次设置 body 的时候，就是将结果保存在 _body 上而已
    this._body = value;
  },

  get body() {
    return this._body;
  },
};

module.exports = response;
