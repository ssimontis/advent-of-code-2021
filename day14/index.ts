import {promises as fs} from "fs";
import _ from "lodash";

const readInput = async (): Promise<Map<string, string>> => {
  const result = new Map<string, string>();

  (await fs.readFile('input.txt', 'utf-8')).split('\r\n').map(x => x.split(' -> ')).forEach(x => result.set(x[0], x[1]));

  return result;
}

const polymerMap = await readInput();
const initialChain = "FSKBVOSKPCPPHVOPVFPC";

const pairChain = (chain: string): string[] => {
  const elements = chain.split('');
  const pairs: string[] = [];

  while(elements.length !== 1) {
    pairs.push(`${elements.shift()}${elements[0]}`);
  }


  return pairs;
}

const runChain = (chain: string): string =>
  pairChain(chain).map(p => `${p[0]}${polymerMap.get(p) || ''}${p[1]}`).join('');

let result = initialChain;

for(let i = 0; i < 10; i += 1) {
  result = runChain(result);
}

type letterCount = {[s: string]: number};
const letters: letterCount = {};

for (const c of result.split('')) {
  if (!letters[c]) {
    letters[c] = 1;
  } else {
    letters[c] += 1;
  }
}

const counts = Object.values(letters);
console.log(JSON.stringify(counts))
const answer = Math.max(...counts) - Math.min(...counts);
console.log(answer);

