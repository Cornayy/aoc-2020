import { LocalReader } from './util/LocalReader';
import { Day1 } from './01/01';

const reader = new LocalReader();

try {
    const day = new Day1(reader, './src/01/input.txt');
    const a = day.solveA();
    const b = day.solveB();

    console.log(a);
    console.log(b);
} catch (err) {
    console.error(err);
}
