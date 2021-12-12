import {promises as fs} from "fs";

interface Point {
  x: number;
  y: number;
  count: number;
}

interface Line {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const readInput = async (): Promise<Line[]> => {
  const input = await fs.readFile('input.txt', "utf8");
  const lines = input.split("\r\n");
  const result: Line[] = [];

  for (const line of lines) {
    const entries = line.split(' -> ');

    const startCoordinates = entries[0].split(',').map(x => Number.parseInt(x, 10));
    const endCoordinates = entries[1].split(',').map(x => Number.parseInt(x, 10));

    result.push({
      startX: startCoordinates[0],
      startY: startCoordinates[1],
      endX: endCoordinates[0],
      endY: endCoordinates[1]
    });
  }

  return result;
}

const isHorizontalOrVerticalLine = (line: Line): boolean =>
  line.startX === line.endX || line.startY === line.endY;

const swapCoordinates = (line: Line): Line =>
  line.endY < line.startY || line.endX < line.startX ? {
    startX: line.endX,
    startY: line.endY,
    endX: line.startX,
    endY: line.startY
  } : line;

const mapPlot: Point[] = [];

const addLine = (line: Line) => {
  for (let x = line.startX; x <= line.endX; x += 1) {
    for (let y = line.startY; y <= line.endY; y += 1) {
      const existingCoordinateIndex = mapPlot.findIndex(point => point.x === x && point.y === y);
      if (existingCoordinateIndex === -1) {
        mapPlot.push({
          x,
          y,
          count: 1
        });

        continue;
      }

      mapPlot[existingCoordinateIndex].count += 1;
    }
  }
}

const allLines = await readInput();
allLines.filter(isHorizontalOrVerticalLine).map(swapCoordinates).forEach(addLine);
console.log(mapPlot.length);

const answer = mapPlot.reduce((prev, cur) => prev += cur.count > 1 ? 1 : 0, 0);
console.log(`Answer is ${answer}`);