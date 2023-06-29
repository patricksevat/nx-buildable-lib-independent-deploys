const { dependencies } = require('./package.json');
const {
  getAdditionalShared,
} = require('../../tools/buildable-libs/get-shared-config-for-buildable-libs');

module.exports = {
  name: 'host-app',
  remotes: ['remote-app1', 'remote-app2'],
  additionalShared: getAdditionalShared(dependencies),
};
