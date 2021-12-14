import { promises as fs} from "fs";
import _ from "lodash";

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
    digitOutputs: x[0].split(' ').map(x => x.split('').sort().join('')),
    displayOutputs: x[1].split(' ').map(x => x.split('').sort().join(''))
  }));
}

// const digitMap = new Map<number, number>();
// digitMap.set(1, 2);
// digitMap.set(4, 4);
// digitMap.set(7, 3);
// digitMap.set(8, 7);

// const uniqueDigitSegments = [...digitMap.values()];
// const inputCases = await readInput();

// const uniqueDigitCounts = inputCases
//   .reduce((prev, cur) => 
//     prev += cur.displayOutputs
//       .map(x => x.length)
//       .reduce((p, c) => 
//         p += uniqueDigitSegments.includes(c) ? 1 : 0, 0), 0);

// console.log(uniqueDigitCounts);

const solveInputCase = (input: InputCase) => {
  const {digitOutputs, displayOutputs} = input;
  const digitMapping = new Map<number, string>();

  const eightMap = digitOutputs.find(x => x.length === 7);
  digitMapping.set(8, eightMap || "");

  const oneMap = digitOutputs.find(x => x.length === 2);
  digitMapping.set(1, oneMap || "");

  const fourMap = digitOutputs.find(x => x.length === 4);
  digitMapping.set(4, fourMap || "");

  const sevenMap = digitOutputs.find(x => x.length === 3);
  digitMapping.set(7, sevenMap || "");

  const topSegment = _.difference(digitMapping.get(1) || [], digitMapping.get(7) || [])[0];
  

}

const digitMap = new Map<number, string>();