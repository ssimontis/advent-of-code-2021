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

const calculateDistance = (current: number, target: number): number => {
  const distance = Math.abs(current - target);
  let fuelSpent = 0;

  for (let i = 1; i <= distance; i += 1) {
    fuelSpent += i;
  }

  return fuelSpent;
}

const avgMax = Math.ceil(sorted.reduce((prev, cur) => prev += cur, 0) / len);
const avgMin = Math.floor(sorted.reduce((prev, cur) => prev += cur, 0) / len);

const maxAvgFuel = sorted.reduce((prev, cur) => prev += calculateDistance(cur, avgMax), 0);
const minAvgFuel = sorted.reduce((prev, cur) => prev += calculateDistance(cur, avgMin), 0);

console.log(maxAvgFuel > minAvgFuel ? avgMin : avgMax);