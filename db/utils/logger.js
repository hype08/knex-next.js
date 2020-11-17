const util = require('util');

const createLogger = (type) => (...args) => {
  console[type](
    ...args.map((item) => {
      if (typeof item === 'object') {
        return util.inspect(item, { depth: 5, colors: true });
      }

      return item;
    })
  );
};

module.exports = {
  info: createLogger('log'),
  warn: createLogger('warning'),
  error: createLogger('error'),
};
