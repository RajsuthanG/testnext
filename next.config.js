const withSass = require("@zeit/next-sass");
const withSassFn = withSass();
module.exports = {
  withSassFn,
  reactStrictMode: false,
};
