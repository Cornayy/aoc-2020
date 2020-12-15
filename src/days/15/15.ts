import { IReader } from './../../parsing/IReader';
import { Day } from '../../Day';

export class Day15 extends Day {
    private readonly starting: number[];

    constructor(reader: IReader) {
        super(reader, 15);
        this.starting = reader
            .string(15)
            .split(',')
            .map((entry) => parseInt(entry));
    }

    public solveA(): number {
        return this.play(2020);
    }

    public solveB(): number {
        return this.play(30000000);
    }

    private play(turns: number): number {
        const mostRecent = new Map<number, number>();
        const previous = new Map<number, number>();
        let currentTurn = 0;
        let lastSpoken = 0;
        currentTurn = this.starting.length;

        this.starting.forEach((num, i) => {
            mostRecent.set(num, i + 1);
            lastSpoken = num;
        });

        while (currentTurn < turns) {
            currentTurn++;
            const recent = mostRecent.get(lastSpoken);
            const prev = previous.get(lastSpoken);

            lastSpoken = recent && prev ? recent - prev : 0;
            const check = mostRecent.get(lastSpoken);

            if (check) previous.set(lastSpoken, check);
            mostRecent.set(lastSpoken, currentTurn);
        }

        return lastSpoken;
    }
}
