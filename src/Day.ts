import { IReader } from './parsing/IReader';

export abstract class Day {
    protected readonly input: string[];

    constructor(reader: IReader, path: string) {
        this.input = reader.read(path);
    }

    public abstract solveA(): number;
    public abstract solveB(): number;
}
