import { IReader } from './../parsing/IReader';
import { Day } from '../Day';

const TREE = '#';

interface Position {
    x: number;
    y: number;
}

interface Slope {
    xSteps: number;
    ySteps: number;
}

export class Day3 extends Day {
    private readonly length: number;

    constructor(reader: IReader, path: string) {
        super(reader, path);
        this.length = this.input[0].length;
    }

    public solveA(): number {
        return this.traverse({ x: 0, y: 0 }, { xSteps: 3, ySteps: 1 });
    }

    public solveB(): number {
        const road = [
            this.traverse({ x: 0, y: 0 }, { xSteps: 1, ySteps: 1 }),
            this.traverse({ x: 0, y: 0 }, { xSteps: 3, ySteps: 1 }),
            this.traverse({ x: 0, y: 0 }, { xSteps: 5, ySteps: 1 }),
            this.traverse({ x: 0, y: 0 }, { xSteps: 7, ySteps: 1 }),
            this.traverse({ x: 0, y: 0 }, { xSteps: 1, ySteps: 2 }),
        ];
        return road.reduce((a, b) => a * b);
    }

    private traverse(position: Position, slope: Slope): number {
        let found = 0;

        while ((position.y += slope.ySteps) < this.input.length) {
            position.x = (position.x + slope.xSteps) % this.length;
            if (this.input[position.y][position.x] === TREE) found++;
        }

        return found;
    }
}
