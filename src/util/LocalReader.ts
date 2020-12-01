import { IReader } from './IReader';
import { readFileSync } from 'fs';

export class LocalReader implements IReader {
    public read(path: string): string[] {
        return readFileSync(path, 'utf-8')
            .split('\n')
            .filter((entry) => entry);
    }
}
