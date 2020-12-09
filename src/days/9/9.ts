import { IReader } from './../../parsing/IReader';
import { Day } from '../../Day';

export class Day9 extends Day {
    private readonly preamble: number;

    constructor(reader: IReader) {
        super(reader, 9);
        this.preamble = 25;
    }

    public solveA(): number {
        return this.culprit();
    }

    public solveB(): number {
        const culprit = this.culprit();
        const numbers = this.input.map((entry) => parseInt(entry));

        for (let i = 0; i < numbers.length; i++) {
            let sum = numbers[i];
            const set = [numbers[i]];
            for (let j = i + 1; j < numbers.length; j++) {
                sum += numbers[j];
                set.push(numbers[j]);

                if (sum > culprit) {
                    break;
                } else if (sum === culprit) {
                    return Math.min(...set) + Math.max(...set);
                }
            }
        }
    }

    private culprit(): number {
        for (let i = this.preamble; i < this.input.length; i++) {
            const current = parseInt(this.input[i]);
            const other = this.input.slice(i - this.preamble, i).map((entry) => parseInt(entry));
            const match = other.some((value) => (other.includes(current - value) ? true : false));
            if (!match) return current;
        }
    }
}
