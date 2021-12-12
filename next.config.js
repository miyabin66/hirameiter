const withTM = require('next-transpile-modules')(['three'])
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([withTM], {
  sassOptions: {
    prependData: '@import "~/styles/commons.scss";',
  },
})
