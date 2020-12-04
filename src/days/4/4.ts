import { IReader } from './../../parsing/IReader';
import { Day } from '../../Day';

const SPLIT = '';

interface ValidationCheck {
    value: string;
    check: (value: string | number) => boolean;
}

export class Day4 extends Day {
    private readonly checks: ValidationCheck[];

    constructor(reader: IReader) {
        super(reader, 4);
        this.input = this.input.filter((entry) => entry !== undefined);
        this.checks = [
            {
                value: 'byr',
                check: (value: string) => {
                    return value.length === 4 && parseInt(value) >= 1920 && parseInt(value) <= 2002;
                },
            },
            {
                value: 'iyr',
                check: (value: string) => {
                    return value.length === 4 && parseInt(value) >= 2010 && parseInt(value) <= 2020;
                },
            },
            {
                value: 'eyr',
                check: (value: string) => {
                    return value.length === 4 && parseInt(value) >= 2020 && parseInt(value) <= 2030;
                },
            },
            {
                value: 'hgt',
                check: (value: string) => {
                    if (value.endsWith('cm')) {
                        const height = parseInt(value.split('cm')[0]);
                        return height >= 150 && height <= 193;
                    } else if (value.endsWith('in')) {
                        const height = parseInt(value.split('in')[0]);
                        return height >= 59 && height <= 76;
                    }
                    return false;
                },
            },
            {
                value: 'hcl',
                check: (value: string) => {
                    return new RegExp(/^#([A-Fa-f0-9]{6})$/).test(value);
                },
            },
            {
                value: 'ecl',
                check: (value: string) => {
                    return ['amb', 'blu', 'brn', 'gry', 'hzl', 'oth', 'grn'].includes(value);
                },
            },
            {
                value: 'pid',
                check: (value: string) => {
                    return new RegExp(/^(\d{9})$/).test(value);
                },
            },
        ];
    }

    public solveA(): number {
        return this.validatePassports();
    }

    public solveB(): number {
        return this.validatePassports(true);
    }

    private validatePassports(validateValues?: boolean): number {
        let check = [];
        let found = 0;

        for (let i = 0; i < this.input.length; i++) {
            check = this.checks.map(({ value }) => value);

            while (this.input[i] !== SPLIT && this.input[i]) {
                const properties = this.input[i].split(' ');

                for (const prop of properties) {
                    const [id, value] = prop.split(':');

                    if (check.includes(id)) {
                        if (
                            validateValues &&
                            !this.checks.find(({ value }) => value === id).check(value)
                        )
                            continue;
                        check = check.filter((item) => item !== id);
                    }
                }
                i++;
            }

            if (check.length === 0) found++;
        }

        return found;
    }
}
