import {promises as fs} from "fs";

const readInputs = async (): Promise<number[]> => {
  const input = await fs.readFile('input.txt', 'utf-8');
  
  return input.split(',').map(x => Number.parseInt(x, 10));
}

const startingFish = await readInputs();
const numDays = 256;
const maxStartingLifespan = 6;
const newLifespan = 8;

const fishLives = new Map<number, number>();

for (let i = 0; i <= maxStartingLifespan; i += 1) {
  const fishCount = startingFish.filter(x => x === i).length;
  fishLives.set(i, fishCount);
}

const runDay = () => {
  const zeroes = fishLives.get(0) || 0;

  for (let i = 1; i <= newLifespan; i += 1) {
    const fishCount = fishLives.get(i) || 0;
    fishLives.set(i - 1, fishCount);
  }

  const existingFish = fishLives.get(maxStartingLifespan) || 0;
  fishLives.set(maxStartingLifespan, existingFish + zeroes);
  fishLives.set(8, zeroes);
}

for (let i = 0; i < numDays; i += 1) {
  runDay();
}

let count = 0;
for (let i = 0; i <= 8; i += 1) {
  count += fishLives.get(i) || 0;
}

console.log(count);