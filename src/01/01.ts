import { getInput } from './../util/parser';

export class Day1 {
    private static expenses = getInput('./src/01/input.txt');

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
