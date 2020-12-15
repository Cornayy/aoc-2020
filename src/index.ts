import { Day15 } from './days/15/15';
import { LocalReader } from './parsing/LocalReader';

const reader = new LocalReader();

try {
    const day = new Day15(reader);
    const a = day.solveA();
    const b = day.solveB();

    console.log(a);
    console.log(b);
} catch (err) {
    console.error(err);
}
