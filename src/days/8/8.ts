import { IReader } from './../../parsing/IReader';
import { Day } from '../../Day';

const NOP = 'nop';
const ACC = 'acc';
const JMP = 'jmp';

interface Action {
    value: string;
    execute: (value: number, line: number) => number;
}

export class Day8 extends Day {
    private accumulator: number;
    private lines: string[];
    private readonly actions: Action[];

    constructor(reader: IReader) {
        super(reader, 8);
        this.accumulator = 0;
        this.lines = [...this.input];
        this.actions = [
            {
                value: ACC,
                execute: (value: number, line: number) => {
                    this.accumulator += value;
                    return (line += 1);
                },
            },
            {
                value: JMP,
                execute: (value: number, line: number) => {
                    return (line += value);
                },
            },
        ];
    }

    public solveA(): number {
        const [accumulator] = this.run();
        return accumulator;
    }

    public solveB(): number {
        for (const [index] of this.lines.entries()) {
            this.reset();

            const [action] = this.lines[index].split(' ');
            if (action === ACC) continue;

            if (action === NOP) {
                this.lines[index] = this.lines[index].replace(NOP, JMP);
            } else if (action === JMP) {
                this.lines[index] = this.lines[index].replace(JMP, NOP);
            }

            const [accumulator, broken] = this.run();

            if (!broken) {
                return accumulator;
            }
        }
    }

    private run(): [number, boolean] {
        const executed = new Set<number>();
        let broken = false;
        let index = 0;

        while (index < this.lines.length) {
            if (executed.has(index)) {
                broken = true;
                break;
            }

            const [action, value] = this.lines[index].split(' ');
            const found = this.actions.find(({ value }) => value === action);
            executed.add(index);

            found ? (index = found.execute(Number(value), index)) : index++;
        }

        return [this.accumulator, broken];
    }

    private reset(): void {
        this.accumulator = 0;
        this.lines = [...this.input];
    }
}
