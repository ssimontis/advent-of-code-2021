import {promises as fs} from "fs";

const readInput = async (): Promise<string[]> => {
  const input = await fs.readFile('input.txt', "utf8");
  return input.split("\n");
}

class Submarine {
  private depth = 0;
  private horizontal = 0;
  private aim = 0;

  constructor(commands: string[]) {
    for (const cmd of commands) {
      this.parseCommand(cmd);
    }
   }

  private forward(magnitude: number) {
    this.horizontal += magnitude;
    this.depth += this.aim * magnitude;
  }

  private down(magnitude: number) {
    this.aim += magnitude;
  }

  private up(magnitude: number) {
    this.aim -= magnitude;
  }

  get position() {
    return this.depth * this.horizontal;
  }

  private parseCommand(command: string) {
    const commandParts = command.split(' ');

    if (commandParts.length !== 2) {
      return;
    }

    const verb = commandParts[0];
    const magnitude = Number.parseInt(commandParts[1], 10) || 0;

    switch (true) {
      case verb === 'forward':
        this.forward(magnitude);
        break;

      case verb === 'down':
        this.down(magnitude);
        break;

      case verb === 'up':
        this.up(magnitude);
    }
  }
}

const inputs = await readInput();
const sub = new Submarine(inputs);
const answer = sub.position;

console.log(answer);