import { promises as fs } from "fs";

const readInput = async (): Promise<number[][]> => {
  const input = await fs.readFile("input.txt", "utf-8");

  return input.split('\r\n')
  .map(x => x.split('')
  .map(y => Number.parseInt(y, 10)));
}

const map = await readInput();

const minPoints: number[] = [];

for (let y = 0; y < map.length; y += 1) {
  for (let x = 0; x < map[y].length; x += 1) {
    const focalPoint = map[y][x];
    
    const isMin = [
      (map[y-1] != null ? map[y - 1][x] : null),
      (map[y+1] != null ? map[y + 1][x] : null),
      map[y][x - 1],
      map[y][x + 1]
    ].filter(x => x != null).every(x => x != null && x > focalPoint);

    if (isMin) {
      minPoints.push(focalPoint);
    }
  }
}

const answer = minPoints.map(x => x + 1).reduce((prev, cur) => prev += cur, 0);

console.log(answer);