import { IReader } from '../parsing/IReader';
import { Day } from '../Day';

export class Day2 extends Day {
    constructor(reader: IReader, path: string) {
        super(reader, path);
    }

    public solveA(): number {
        return this.input
            .map((pw) => {
                const [range, character, password] = pw.split(' ');
                const [min, max] = range.split('-');
                const amountOfCharacter = password.split(character.charAt(0)).length - 1 || 0;

                if (amountOfCharacter >= parseInt(min) && amountOfCharacter <= parseInt(max)) {
                    return 1;
                }
            })
            .filter((pw) => pw)
            .reduce((a, b) => a + b);
    }

    public solveB(): number {
        throw new Error('Method not implemented.');
    }
}
