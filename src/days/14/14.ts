import { IReader } from './../../parsing/IReader';
import { Day } from '../../Day';

const MASK = 'mask';
const MEMORY = 'mem';

export class Day14 extends Day {
    private memory: Map<number, number>;
    private mask: string;

    constructor(reader: IReader) {
        super(reader, 14);
    }

    public solveA(): number {
        this.reset();
        return this.run();
    }

    public solveB(): number {
        this.reset();
        return this.run(true);
    }

    private run(v2?: boolean): number {
        for (const instr of this.input) {
            const [assignee, value] = instr.split(' = ');

            if (assignee === MASK) {
                this.mask = value;
                continue;
            }

            if (assignee.startsWith(MEMORY)) {
                const num = parseInt(value, 10);

                if (!v2) {
                    const address = parseInt(assignee.match(/\d+/)[0], 10);
                    const actual = this.applyMask(num.toString(2), this.mask);
                    this.memory.set(address, parseInt(actual, 2));
                } else {
                    const addresses = this.toFloat(
                        parseInt(assignee.match(/\d+/)[0], 10),
                        this.mask
                    );
                    addresses.forEach((address) => this.memory.set(address, num));
                }
            }
        }

        return Array.from(this.memory.values()).reduce((a, b) => a + b);
    }

    private reset(): void {
        this.mask = '';
        this.memory = new Map();
    }

    private applyMask(value: string, mask: string): string {
        const newValue = value.padStart(mask.length, '0').split('');
        mask.split('').forEach((letter, i) => {
            if (letter === '1') {
                newValue[i] = '1';
            } else if (letter === '0') {
                newValue[i] = '0';
            }
        });
        return newValue.join('');
    }

    private toFloat(decimalAddress: number, mask: string): number[] {
        const address = decimalAddress.toString(2).padStart(mask.length, '0').split('');

        mask.split('').forEach((bit, i) => {
            if (bit === '0') return;
            if (bit === '1') {
                address[i] = '1';
                return;
            }
            if (bit === 'X') {
                address[i] = 'X';
            }
        });

        return this.resolveFloat(address);
    }

    private resolveFloat(numFloatingBits: string[]): number[] {
        let results = new Set<string[]>();

        results.add(numFloatingBits);

        numFloatingBits.forEach((bit, index) => {
            if (bit === 'X') {
                const nextResults = new Set<string[]>();

                results.forEach((bits) => {
                    const zero = [...bits];
                    const one = [...bits];
                    zero[index] = '0';
                    one[index] = '1';

                    nextResults.add(zero);
                    nextResults.add(one);
                });

                results = nextResults;
            }
        });

        return Array.from(results.values()).map((bits) => parseInt(bits.join(''), 2));
    }
}
