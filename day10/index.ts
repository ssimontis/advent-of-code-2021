import { promises as fs} from "fs";

const readInput = async (): Promise<string[]> => {
  const input = await fs.readFile('input.txt', 'utf-8');

  return input.split('\r\n'); 
}

const symbolMap = new Map<string, string>();
symbolMap.set('(', ')');
symbolMap.set('<', '>');
symbolMap.set('[', ']');
symbolMap.set('{', '}');

const startingSymbols = [...symbolMap.keys()];

const lineIsValid = (line: string): string => {
  const stack: string[] = [];
  const chars = line.split('');

  for (const c of chars) {
    if (startingSymbols.includes(c)) {
      stack.push(c);
    } else {
      if (!stack.length) {
        return c;
      }

      const lastOpening = stack.pop() || '';
      const match = symbolMap.get(lastOpening);
      if (!match) {
        return c;
      }

      if (match !== c) {
        return c;
      }
    }
  }

  return '';
}

const invalidScores = new Map<string, number>();
invalidScores.set(')', 3);
invalidScores.set(']', 57);
invalidScores.set('}', 1197);
invalidScores.set('>', 25137);

const syntaxLines = await readInput();
console.log(syntaxLines.map(lineIsValid));
const answer = syntaxLines.map(lineIsValid).filter(x => !!x).map(x => invalidScores.get(x) || 0).reduce((prev, cur) => prev += cur, 0);

console.log(`${answer}`);
