import { IReader } from '../../parsing/IReader';
import { Day } from '../../Day';

export class Day1 extends Day {
    private readonly expenses: number[];
    private readonly values: Set<number>;

    constructor(reader: IReader) {
        super(reader, 1);
        this.expenses = this.input.map((entry) => parseInt(entry));
        this.values = new Set<number>(this.expenses);
    }

    public solveA(): number {
        for (const expense of this.expenses) {
            const rest = 2020 - expense;
            if (this.values.has(rest)) {
                return expense * rest;
            }
        }

        throw new Error('The two values that should lead up to 2020 have not been found.');
    }

    public solveB(): number {
        for (const expense of this.expenses) {
            for (const check of this.expenses) {
                const rest = 2020 - expense - check;
                if (this.values.has(rest)) {
                    return expense * check * rest;
                }
            }
        }

        throw new Error('The three values that should lead up to 2020 have not been found.');
    }
}
