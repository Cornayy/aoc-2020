import { IReader } from './../../parsing/IReader';
import { Day } from '../../Day';

const OUT_OF_SERVICE = 'x';

export class Day13 extends Day {
    private readonly time: number;
    private readonly line: number[];

    constructor(reader: IReader) {
        super(reader, 13);

        const [time, line] = this.input;
        this.time = parseInt(time);
        this.line = line
            .split(',')
            .filter((id) => id !== OUT_OF_SERVICE)
            .map((id) => parseInt(id));
    }

    public solveA(): number {
        const [{ id, waitTime }] = this.line
            .map((id) => ({ id, waitTime: id - (this.time % id) }))
            .sort((a, b) => a.waitTime - b.waitTime);

        return id * waitTime;
    }

    public solveB(): number {
        const line = this.input[1]
            .split(',')
            .map((id, index) => ({ id, offset: index }))
            .filter(({ id }) => id !== OUT_OF_SERVICE);

        let min = 0;
        let product = 1;

        line.forEach(({ id, offset }) => {
            const bus = parseInt(id);
            while ((min + offset) % bus !== 0) {
                min += product;
            }
            product *= bus;
        });

        return min;
    }
}
