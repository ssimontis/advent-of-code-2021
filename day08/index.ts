import { promises as fs} from "fs";

interface InputCase {
  digitOutputs: string[];
  displayOutputs: string[];
}

const readInput = async (): Promise<InputCase[]> => {
  const input = await fs.readFile('input.txt', 'utf-8');
  const lines = input.split('\r\n');

  return lines
  .map(x => x.split(' | '))
  .map(x => ({
    digitOutputs: x[0].split(' '),
    displayOutputs: x[1].split(' ')
  }));
}

const digitMap = new Map<number, number>();
digitMap.set(1, 2);
digitMap.set(4, 4);
digitMap.set(7, 3);
digitMap.set(8, 7);

const uniqueDigitSegments = [...digitMap.values()];
const inputCases = await readInput();

const uniqueDigitCounts = inputCases
  .reduce((prev, cur) => 
    prev += cur.displayOutputs
      .map(x => x.length)
      .reduce((p, c) => 
        p += uniqueDigitSegments.includes(c) ? 1 : 0, 0), 0);

console.log(uniqueDigitCounts);