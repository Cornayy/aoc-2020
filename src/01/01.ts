import { getInput } from './../util/parser';

export class Day1 {
    private static expenses = getInput('./src/01/input.txt');
    private static values = new Set<number>(Day1.expenses);

    static solveA(): number {
        for (const expense of Day1.expenses) {
            const rest = 2020 - expense;
            if (Day1.values.has(rest)) {
                return expense * rest;
            }
        }

        throw new Error('The two values that should lead up to 2020 have not been found.');
    }

    static solveB(): number {
        for (const expense of Day1.expenses) {
            for (const check of Day1.expenses) {
                const rest = 2020 - expense - check;
                if (Day1.values.has(rest)) {
                    return expense * check * rest;
                }
            }
        }

        throw new Error('The three values that should lead up to 2020 have not been found.');
    }
}
