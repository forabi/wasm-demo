function add(x, y) {
  return x + y;
};

module.exports.add = add;

function add_one(x) {
  return add(x, 1);
};

module.exports.add_one = add_one;