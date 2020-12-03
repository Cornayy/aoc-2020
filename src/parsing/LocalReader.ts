import { IReader } from './IReader';
import { readFileSync } from 'fs';

export class LocalReader implements IReader {
    public read(day: number): string[] {
        return readFileSync(`./src/days/${day}/input.txt`, 'utf-8')
            .trim()
            .split('\n')
            .map((l) => l.trim());
    }
}
