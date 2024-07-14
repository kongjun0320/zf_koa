function myCreate(proto, propertiesObject) {
  // 创建一个空对象，其原型是null
  function F() {}
  F.prototype = proto;

  // 创建一个新的实例，其原型是F的实例，即proto
  var obj = new F();

  // 如果提供了属性描述符对象，则添加到新对象中
  if (propertiesObject) {
    Object.defineProperties(obj, propertiesObject);
  }

  return obj;
}
