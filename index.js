const { promisify } = require('util');
const fs = require('fs');
const { times } = require('lodash');

const readFile = promisify(fs.readFile);

const rustFile = './dist/rust.wasm';
const assemblyFile = './dist/assemblyscript.wasm';

async function benchmark(file, iterations = 100000000) {
  const { buffer } = await readFile(file);
  const results = await WebAssembly.instantiate(buffer, { });

  const { add_one, add } = results.instance.exports;
  const start = Date.now();
  times(iterations, () => {
    add_one(5);
    add(5, 6);
  });
  const end = Date.now();
  return (end - start);
}

async function main() {
  console.log(assemblyFile, await benchmark(assemblyFile));
  console.log(rustFile, await benchmark(rustFile));
};

main();
