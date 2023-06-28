const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const { withModuleFederation } = require('@nx/react/module-federation');

const baseConfig = require('./module-federation.config');

const mfConfig = {
  ...baseConfig,
};

// Nx plugins for webpack to build config object from Nx options and context.
module.exports = async (config, context) => {
  const webpackConfig = await composePlugins(
    withNx(),
    withReact(),
    withModuleFederation(mfConfig)
  )(config, context);

  webpackConfig.optimization = {
    chunkIds: 'named',
    mangleExports: false,
    moduleIds: 'named',
    minimize: false,
  }

  // At this point in configuration @myorg/buildable-lib is already added to 
  // ModuleFederationPlugin.shared with {requiredVersion: false,eager: undefined,}
  // So independently deploying will still pick up only 1 version

  return webpackConfig;
};
