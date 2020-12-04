import { IReader } from './parsing/IReader';

export abstract class Day {
    protected input: string[];

    constructor(reader: IReader, day: number) {
        this.input = reader.read(day);
    }

    public abstract solveA(): number;
    public abstract solveB(): number;
}
