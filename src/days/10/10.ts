import { IReader } from './../../parsing/IReader';
import { Day } from '../../Day';

export class Day10 extends Day {
    private readonly numbers: number[];

    constructor(reader: IReader) {
        super(reader, 10);
        const nums = this.input.map((entry) => parseInt(entry)).sort((a, b) => a - b);
        this.numbers = [0, ...nums, nums[nums.length - 1] + 3];
    }

    public solveA(): number {
        const diffs = this.differences();
        return diffs.filter((v) => v === 1).length * diffs.filter((v) => v === 3).length;
    }

    public solveB(): number {
        const diffs = this.differences();
        const streaks = [];
        for (let i = 0, p = 0; i < diffs.length - 1; i++, p = i) {
            while (diffs[i + 1] === 1 && diffs[i] === 1) i++;
            if (i !== p) streaks.push(i - p + 1);
        }

        return streaks
            .map((v) => {
                let p = 1;
                for (let i = 1; i < v; i++) {
                    p += i;
                }
                return p;
            })
            .reduce((a, v) => a * v, 1);
    }

    private differences(): number[] {
        const diffs = [];
        for (let i = 1; i < this.numbers.length; i++) {
            diffs.push(this.numbers[i] - this.numbers[i - 1]);
        }
        return diffs;
    }
}
