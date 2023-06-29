module.exports = {
  name: 'remote-app1',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};
