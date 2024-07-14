const proto = {
  get url() {
    return this.request.url;
  },

  get path() {
    return this.request.path;
  },

  get query() {
    return this.request.path;
  },
};

function Delegator(proto, target) {
  if (!(this instanceof Delegator)) return new Delegator(proto, target);
  this.proto = proto;
  this.target = target;
  this.methods = [];
  this.getters = [];
  this.setters = [];
  this.fluents = [];
}

Delegator.prototype.method = function (name) {
  var proto = this.proto;
  var target = this.target;
  this.methods.push(name);

  proto[name] = function () {
    return this[target][name].apply(this[target], arguments);
  };

  return this;
};

Delegator.prototype.access = function (name) {
  return this.getter(name).setter(name);
};

Delegator.prototype.getter = function (name) {
  var proto = this.proto;
  var target = this.target;
  this.getters.push(name);

  proto.__defineGetter__(name, function () {
    return this[target][name];
  });

  return this;
};

Delegator.prototype.setter = function (name) {
  var proto = this.proto;
  var target = this.target;
  this.setters.push(name);

  proto.__defineSetter__(name, function (val) {
    return (this[target][name] = val);
  });

  return this;
};

Delegator.prototype.fluent = function (name) {
  var proto = this.proto;
  var target = this.target;
  this.fluents.push(name);

  proto[name] = function (val) {
    if ('undefined' != typeof val) {
      this[target][name] = val;
      return this;
    } else {
      return this[target][name];
    }
  };

  return this;
};

function delegate(proto, target) {
  return new Delegator(proto, target);
}

delegate(proto, 'request').access('query').access('path').access('url');

// Object.defineProperty / proxy

module.exports = proto;
