import { readFileSync } from 'fs';

export class Day1 {
    private static expenses = Day1.getExpenses();

    static getExpenses(): number[] {
        return readFileSync('./src/day-1/input.txt', 'utf-8')
            .split('\n')
            .map((entry) => parseInt(entry));
    }

    static solveA(): number {
        for (const expense of Day1.expenses) {
            if (expense >= 2020) continue;
            for (const check of Day1.expenses) {
                if (expense + check === 2020) {
                    return expense * check;
                }
            }
        }

        return 0;
    }

    static solveB(): number {
        for (const expense of Day1.expenses) {
            if (expense >= 2020) continue;
            for (const check of Day1.expenses) {
                if (expense + check > 2020) continue;
                for (const third of Day1.expenses) {
                    if (expense + check + third === 2020) {
                        return expense * check * third;
                    }
                }
            }
        }

        return 0;
    }
}
