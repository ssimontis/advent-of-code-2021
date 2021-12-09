import {promises as fs} from "fs";

const readInput = async (): Promise<Array<Array<number>>> => {
  const input = await fs.readFile('input.txt', "utf8");
  const lines = input.split("\r\n");
  return lines.map(x => x.split('').map(x => Number.parseInt(x, 10)));
}

const getPowerConsumption = (inputs: Array<Array<number>>): number => {
  const length = inputs[0]?.length || 0;
  const gamma = [];
  const epsilon = [];

  for (let i = 0; i < length; i += 1) {
    const oneCount = inputs.reduce((prev, current) => prev += (current[i] === 1) ? 1 : 0, 0);
    const zeroCount = inputs.reduce((prev, current) => prev += (current[i] === 0) ? 1 : 0, 0);

    gamma.push(oneCount >= zeroCount ? 1 : 0);
    epsilon.push(oneCount >= zeroCount ? 0 : 1);
  }

  const gammaDecimal = Number.parseInt(gamma.reduce((prev, current) => prev += `${current}`, ''), 2);
  const epsilonDecimal = Number.parseInt(epsilon.reduce((prev, current) => prev += `${current}`, ''), 2);

  return gammaDecimal * epsilonDecimal;
}



const getLifeSupportValues = (inputs: Array<Array<number>>): number => {
  const length = inputs[0]?.length || 0;
  let oxygenList = [...inputs];
  let scrubberList = [...inputs];
  let oxygenValue = 0;
  let scrubberValue = 0;

  for (let i = 0; i < length; i += 1) {
    oxygenList = filterOxygenListForBitPosition(oxygenList, i);

    if (oxygenList.length === 1) {
      oxygenValue = Number.parseInt(oxygenList[0].reduce((prev, current) => prev += `${current}`, ''), 2);
      break;
    }
  }

  for (let i = 0; i < length; i += 1) {
    scrubberList = filterScrubberListForBitPosition(scrubberList, i);

    if (scrubberList.length === 1) {
      scrubberValue = Number.parseInt(scrubberList[0].reduce((prev, current) => prev += `${current}`, ''), 2);
      break;
    }
  }

  return oxygenValue * scrubberValue;
}

const filterOxygenListForBitPosition = (inputs: Array<Array<number>>, position: number): Array<Array<number>> => {
  const oneCount = inputs.reduce((prev, current) => prev += (current[position] === 1) ? 1 : 0, 0);
  const zeroCount = inputs.reduce((prev, current) => prev += (current[position] === 0) ? 1 : 0, 0);

  const dominantBit = oneCount >= zeroCount ? 1 : 0;

  return inputs.filter(x => x[position] === dominantBit);
}

const filterScrubberListForBitPosition = (inputs: Array<Array<number>>, position: number): Array<Array<number>> => {
  const oneCount = inputs.reduce((prev, current) => prev += (current[position] === 1) ? 1 : 0, 0);
  const zeroCount = inputs.reduce((prev, current) => prev += (current[position] === 0) ? 1 : 0, 0);

  const subBit = oneCount === zeroCount ? 0 
    : oneCount > zeroCount ? 0 : 1;

  return inputs.filter(x => x[position] === subBit);
}

const data = await readInput();
const part2 = getLifeSupportValues(data);
console.log(part2);