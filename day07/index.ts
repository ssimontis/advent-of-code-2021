import {promises as fs} from "fs";

const readInputs = async (): Promise<number[]> => {
  const input = await fs.readFile('input.txt', 'utf-8');

  return input.split(',').map(x => Number.parseInt(x, 10));
}

const input = await readInputs();
const sorted = input.sort((a, b) => a - b);

const len = sorted.length;

const median = len % 2 === 0 ? ((sorted[len/2] + sorted[(len / 2) - 1]) / 2) : sorted[len/2];
const minDistance = sorted.reduce((prev, cur) => prev + Math.abs(cur - median), 0);
console.log(minDistance);