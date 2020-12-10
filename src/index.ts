import { LocalReader } from './parsing/LocalReader';
import { Day10 } from './days/10/10';

const reader = new LocalReader();

try {
    const day = new Day10(reader);
    const a = day.solveA();
    const b = day.solveB();

    console.log(a);
    console.log(b);
} catch (err) {
    console.error(err);
}
