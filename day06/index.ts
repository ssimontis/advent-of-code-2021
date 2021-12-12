import {promises as fs} from "fs";

const readInputs = async (): Promise<number[]> => {
  const input = await fs.readFile('input.txt', 'utf-8');
  
  return input.split(',').map(x => Number.parseInt(x, 10));
}

const startingFish = await readInputs();
const numDays = 80;

const runDay = (currentFish: number[]): number[] => {
  const zeroes = currentFish.filter(x => x === 0);

  const nonZeroes = currentFish.filter(x => x !== 0);
  const countdownValues = nonZeroes.map(x => x - 1);

  for (const zero in zeroes) {
    countdownValues.push(8);
    countdownValues.push(6);
  }

  return countdownValues;
}

let dailyFish: number[] = startingFish;

for (let i = 0; i < numDays; i += 1) {
  dailyFish = runDay(dailyFish);
}

console.log(dailyFish.length);