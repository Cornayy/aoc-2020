import { readFileSync } from 'fs';

export const getInput = (path: string): number[] => {
    return readFileSync(path, 'utf-8')
        .split('\n')
        .filter((entry) => entry)
        .map((entry) => parseInt(entry));
};
