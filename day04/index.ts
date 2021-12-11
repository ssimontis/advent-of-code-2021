import {promises as fs} from "fs";

interface BingoInputs {
  numbers: number[];
  boards: Board[];
}

interface Space {
  value: number;
  picked: boolean;
  // Coordinate origin is top-left corner
  x: number;
  y: number;
}

interface Board {
  spaces: Space[];
}

const readInput = async (): Promise<BingoInputs> => {
  const input = await fs.readFile('input.txt', "utf8");
  const lines = input.split("\n");

  const [numbersCalled] = lines.splice(0, 1);
  const numbers = numbersCalled.split(',').map(x => Number.parseInt(x, 10));
  
  const boards: Board[] = [];
  let currentX = 0;
  let currentY = 0;
  let spaces: Space[] = [];
  for (const line of lines) {
    if (line === '\r' && spaces.length) {
      boards.push({
        spaces: [...spaces]
      })
      currentX = 0;
      currentY = 0;
      spaces = [];
      continue;
    }

    const numbers = line.split(' ').filter(x => x !== '');
    for (const number of numbers) {
      spaces.push({
        value: Number.parseInt(number.replace(' ', ''), 10),
        picked: false,
        x: currentX,
        y: currentY
      });

      currentX += 1;
    }

    currentX = 0;
    currentY += 1;
  }


  return {
    boards,
    numbers
  };
}

const hasWon = (board: Board): boolean => {
  for (let row = 0; row < 5; row += 1) {
    if (board.spaces.filter(b => b.y === row).every(s => s.picked)) {
      return true;
    }
  }

  for (let col = 0; col < 5; col += 1) {
    if (board.spaces.filter(b => b.x === col).every(s => s.picked)) {
      return true;
    }
  }

  return false;
}

const gameParameters = await readInput();
const {numbers, boards} = gameParameters;

for (const number of numbers) {
  for (const board of boards) {
    const match = board.spaces.findIndex(s => s.value === number);
    if (match !== -1) {
      board.spaces[match].picked = true;
    }
  }
  

  const winner = boards.find(hasWon);
  if (winner) {
    const unmarkedScore = winner.spaces.filter(x => !x.picked).reduce((prev, cur) => prev += cur.value, 0);
    const answer = unmarkedScore * number;
    console.log(`Answer is ${answer}`);
    break;
  }
}