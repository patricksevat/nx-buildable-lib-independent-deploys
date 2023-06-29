import { createHashFromFiles } from './get-hash-from-files';
import path from 'node:path';
import fs from 'node:fs/promises';

const rootDir = path.join(__dirname, '../../');

async function copyPackageJsonWithVersionHash(libName: string) {
  // At this point the .d.ts file(s) have been outputted to the file system

  // At this moment package.json is not copied yet, that done by nx/vite executor:
  // https://github.com/nrwl/nx/blob/1891addc09b66919d3a41b0330459fd9f80f9fbb/packages/vite/src/executors/build/build.impl.ts#L75
  // so let's copy and modify it ourselves

  // the benefit of doing it like this:
  // - no commit needed to package.json to update the version, only the package.json in dist/libs gets a hash
  // - a change in interface will immediately cause a new version, no need to rely on devs to determine breaking changes or forgetting to bump
  //   - this can be enhanced further by adding interface tests using https://github.com/mmkal/expect-type or https://github.com/SamVerschueren/tsd
  // - only works with TS, which increases TS adoption
  // - no need to worry about semver ranges, we will use an exact version
  const distDir = path.join(rootDir, 'dist/libs', libName);
  const srcDir = path.join(rootDir, 'libs', libName);

  // TODO: possibly can be replaced by https://github.com/nrwl/nx/blob/master/packages/nx/src/hasher/file-hasher.ts#L5 
  const generatedDtsHash = await createHashFromFiles(distDir, ['**/*.d.ts']);

  const packageJsonStr = await fs.readFile(path.join(srcDir, 'package.json'), 'utf8');
  const packageJson = JSON.parse(packageJsonStr);
  const updatedPackageJson = {
    ...packageJson,
    version: `${packageJson.version}-${generatedDtsHash}`,
  };
  
  // TODO: replace by https://github.com/nrwl/nx/blob/126a19ff0b7d7e19c41663513ddb02fbbb123094/packages/nx/src/utils/fileutils.ts#L85
  await fs.writeFile(
    path.join(distDir, 'package.json'),
    JSON.stringify(updatedPackageJson, null, 2),
    'utf8'
  );
}

export { copyPackageJsonWithVersionHash }