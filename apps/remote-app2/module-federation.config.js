module.exports = {
  name: 'remote-app2',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};
