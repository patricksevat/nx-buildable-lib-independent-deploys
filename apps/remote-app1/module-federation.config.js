const { dependencies } = require('./package.json');
const {
  getAdditionalShared,
} = require('../../tools/buildable-libs/get-shared-config-for-buildable-libs');

module.exports = {
  name: 'remote-app1',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  additionalShared: getAdditionalShared(dependencies),
};
