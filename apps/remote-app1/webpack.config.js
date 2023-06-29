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
    // TODO: will throw warnings:
    // Could not find a version for "react" in the root "package.json" when collecting shared packages for the Module Federation setup. The package will not be shared.
    // https://github.com/nrwl/nx/blob/master/packages/devkit/src/utils/module-federation/share.ts#L105 
    //
    // We offset this by doing the reading of <projectRoot>/package.json dependencies ourselves
    // But should be fixed in Nx 
    withModuleFederation(mfConfig)
  )(config, context);

  webpackConfig.optimization = {
    chunkIds: 'named',
    mangleExports: false,
    moduleIds: 'named',
    minimize: false,
  }

  return webpackConfig;
};
