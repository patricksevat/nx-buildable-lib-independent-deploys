// @ts-check
const path = require('node:path');

const rootDir = path.join(__dirname, '../..');

// TODO: see if we can define this as a @nx/webpack Plugin
/**
 * @typedef {import('@nx/devkit').AdditionalSharedConfig} AdditionalSharedConfig
 *
 * @param { Object<string, string> } dependencies - package.json dependencies property
 * @returns { AdditionalSharedConfig }
 * */
function getAdditionalShared(dependencies) {
  /** @type Object<string, string> */
  const combinedDeps = {
    ...dependencies,
    // TODO: see if we can get this list from https://github.com/nrwl/nx/blob/master/packages/js/src/utils/buildable-libs-utils.ts#L34 or something similar
    '@myorg/buildable-lib': '*',
  };

  return Object.keys(combinedDeps).reduce(
    /**
     * @param aggregator { AdditionalSharedConfig }
     * @param depName { string }
     * */
    (aggregator, depName) => {
      let requiredVersion = combinedDeps[depName];

      // TODO: replace by https://github.com/nrwl/nx/blob/126a19ff0b7d7e19c41663513ddb02fbbb123094/packages/js/src/utils/buildable-libs-utils.ts#L20
      const isBuildableLib =
        depName.includes('@myorg') && depName.includes('buildable');
      if (isBuildableLib) {
        requiredVersion = getRequiredVersionForLib(depName);
      }

      aggregator.push({
        libraryName: depName,
        sharedConfig: {
          requiredVersion,
          singleton: !isBuildableLib,
          strictVersion: isBuildableLib,
        },
      });

      return aggregator;
    },
    []
  );
}

/**
 * NOTE: We have to build in dependency order and most likely on the same agent
 *
 * TODO: check if we can get this bullet proof by ensuring that the buildable lib has been built and that dist/libs/<name> is not out of sync.
 * Perhaps we can use Nx Daemon for this. Or simply spawn a shell with the build of the lib. If it's already built, it will be read from cache === fast
 *
 * */
/**
 * @param {string} depName
 * @param { object } [options]
 * @param { string } [options.tsconfigPath]
 * @param { number } [options.pathAliasIndex]
 * */
function getRequiredVersionForLib(depName, options = {}) {
  const tsconfig = require(options.tsconfigPath ||
    path.join(rootDir, './tsconfig.base.json'));
  const { compilerOptions } = tsconfig;

  const pathArray = compilerOptions.paths?.[depName];

  if (!Array.isArray(pathArray)) {
    throw new Error(`Could not find tsconfig paths for ${depName}`);
  }

  // TODO: perhaps this is not needed and we can recycle the logic from the tmp tsconfig that's being created 
  // https://github.com/nrwl/nx/blob/master/packages/js/src/utils/buildable-libs-utils.ts#L199 
  const pathAliasIndex = options.pathAliasIndex || 0;

  const buildableLibDistDirectory = path.join(
    rootDir,
    pathArray[pathAliasIndex]
  );
  const builtPackageJsonPath = path.join(
    buildableLibDistDirectory,
    'package.json'
  );

  console.log(`Reading ${builtPackageJsonPath}`);

  const packageJson = require(builtPackageJsonPath);
  return packageJson.version;
}

module.exports = { getAdditionalShared };
