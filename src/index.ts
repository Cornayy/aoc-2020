import { Day5 } from './days/5/5';
import { LocalReader } from './parsing/LocalReader';

const reader = new LocalReader();

try {
    const day = new Day5(reader);
    const a = day.solveA();
    const b = day.solveB();

    console.log(a);
    console.log(b);
} catch (err) {
    console.error(err);
}
