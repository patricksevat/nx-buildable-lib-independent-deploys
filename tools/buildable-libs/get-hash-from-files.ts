import fastGlob from 'fast-glob';
import fsPromises from 'node:fs/promises';
import nodeCrypto from 'node:crypto';
import path from 'node:path';

export type CreateHashFromFileOptions = {
  algorithm?: string;
};

// TODO: split into sub fns
async function createHashFromFiles(
  directory: string,
  globPattern: fastGlob.Pattern | fastGlob.Pattern[],
  options: CreateHashFromFileOptions = {}
) {
  const files = await fastGlob(globPattern, { cwd: directory });
  // NOTE: sorting is important fastGlob does not guarantee order!
  const sortedFiles = files.sort();

  const fileReadPromises = sortedFiles.map((file) =>
    fsPromises.readFile(path.join(directory, file), 'utf8')
  );
  const fileContents = await Promise.all(fileReadPromises);

  const algorithm = options.algorithm || 'sha1';
  const shasum = nodeCrypto.createHash(algorithm);

  sortedFiles.forEach((file, index) => {
    shasum.update(`${file}:${fileContents[index]}`, 'utf8');
  });

  const hash = shasum.digest('hex');

  return hash;
}

export { createHashFromFiles };
