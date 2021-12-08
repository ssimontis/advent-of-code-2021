import {promises as fs} from "fs";

const readInput = async (): Promise<number[]> => {
  const input = await fs.readFile('input.txt', "utf8");
  const lines = input.split("\n");

  return lines.map(x => Number.parseInt(x, 10));
}

const countIncreases = (readings: number[]): number => {
  let increases = 0;

  for (let i = 1; readings[i] != null; i += 1) {
    if (readings[i] > readings[i-1]) {
      increases += 1;
    }
  }

  return increases;
}

const slidingWindowIncreases = (readings: number[]): number => {
  const {length} = readings;
  let prevWindow = -1;
  let increases = 0;

  for (let windowBoundary = 3; windowBoundary <= length; windowBoundary += 1) {
    const window = readings.slice(windowBoundary - 3, windowBoundary);
    const windowSum = window.reduce((prev, cur) => prev + cur, 0);

    if (prevWindow === -1) {
      prevWindow = windowSum;
      continue;
    }

    if (windowSum > prevWindow) {
      increases += 1;
    }

    prevWindow = windowSum;
  }

  return increases;
}

const data = await readInput();
const result = slidingWindowIncreases(data);
console.log(result);