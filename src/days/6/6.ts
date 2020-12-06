import { IReader } from './../../parsing/IReader';
import { Day } from '../../Day';

export class Day6 extends Day {
    private readonly groups: string[];

    constructor(reader: IReader) {
        super(reader, 6);
        this.groups = reader.string(6).replace(/\r/gm, '').split('\n\n');
    }

    public solveA(): number {
        return this.groups
            .map((group) => {
                const uniques = new Set<string>();
                for (const person of group.split('\n')) {
                    person.split('').forEach((ch) => uniques.add(ch));
                }
                return uniques.size;
            })
            .reduce((a, b) => a + b);
    }

    public solveB(): number {
        return this.groups
            .map((group) => {
                const answers: string[] = [];
                const people = group.split('\n');

                for (const person of people) {
                    person.split('').forEach((ch) => answers.push(ch));
                }

                let amount = 0;

                for (const value of new Set<string>(answers)) {
                    const occurences = this.getOccurrences(answers, value);
                    if (occurences === people.length) amount++;
                }

                return amount;
            })
            .reduce((a, b) => a + b);
    }

    private getOccurrences(space: string[], value: string): number {
        let occurences = 0;
        for (const entry of space) {
            if (entry === value) {
                occurences++;
            }
        }
        return occurences;
    }
}
