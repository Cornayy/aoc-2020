import { IReader } from './../../parsing/IReader';
import { Day } from '../../Day';

export class Day4 extends Day {
    private readonly mandatory: string[];

    constructor(reader: IReader) {
        super(reader, 4);
        this.mandatory = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
        this.input = this.input.filter((entry) => entry !== undefined);
    }

    public solveA(): number {
        let check = [...this.mandatory];
        let found = 0;

        for (let i = 0; i < this.input.length; i++) {
            if (check.length === 0) found++;
            check = [...this.mandatory];

            while (this.input[i] !== '' && this.input[i]) {
                const properties = this.input[i].split(' ');

                for (const prop of properties) {
                    const [id] = prop.split(':');
                    if (check.includes(id)) {
                        check = check.filter((item) => item !== id);
                    }
                }
                i++;
            }
        }

        return found;
    }

    public solveB(): number {
        return 0;
    }
}
