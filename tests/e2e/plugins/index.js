// const webpack = require('@cypress/webpack-preprocessor')
// module.exports = (on, config) => {
  
//   const options = {
//     webpackOptions: require('../../../webpack.config'),
//     watchOptions: {}
//   }

//   on('file:preprocessor', webpack(options))
//   on('task', {
//     log (message) {
//       return null
//     }
//   })
//   return Object.assign({}, config, {
//     fixturesFolder: 'tests/e2e/fixtures',
//     integrationFolder: 'tests/e2e/specs',
//     screenshotsFolder: 'tests/e2e/screenshots',
//     videosFolder: 'tests/e2e/videos',
//     supportFile: 'tests/e2e/support/index.js',
//   });
// };


module.exports = (on, config) => Object.assign({}, config, {
  fixturesFolder: 'tests/e2e/fixtures',
  integrationFolder: 'tests/e2e/specs',
  screenshotsFolder: 'tests/e2e/screenshots',
  videosFolder: 'tests/e2e/videos',
  supportFile: 'tests/e2e/support/index.js',
});
