const { promisify } = require('util');
const fs = require('fs');
const { times } = require('lodash');

const readFile = promisify(fs.readFile);

const rustFile = './dist/rust.wasm';
const assemblyFile = './dist/assemblyscript.wasm';

const js = require('./src/add.js');

function benchmark(fn, iterations) {
  const start = Date.now();
  times(iterations, () => fn());
  const end = Date.now();
  return end - start;
}

async function benchmarkWasm(file, iterations) {
  const { buffer } = await readFile(file);
  const results = await WebAssembly.instantiate(buffer, { });

  const { add_one, add } = results.instance.exports;
  return benchmark(() => {
    add_one(5);
    add(5, 6);
  }, iterations);
}

async function main() {
  const iterations = Number(process.env.ITERATIONS) || 100000000;
  console.log(`Iterations: ${iterations}`);
  console.log('AssemblyScript', await benchmarkWasm(assemblyFile, iterations));
  console.log('Rust', await benchmarkWasm(rustFile, iterations));
  const { add, add_one } = js;
  console.log('JS', benchmark(() => {
    add_one(5);
    add(5, 6);
  }, iterations))
};

main();
