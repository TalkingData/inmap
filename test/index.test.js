
// require all test files (files that ends with .test.js)
const testsContext = require.context('./unit', true, /\.test$/);
testsContext.keys().forEach(testsContext);