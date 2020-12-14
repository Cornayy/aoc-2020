import { Day14 } from './days/14/14';
import { LocalReader } from './parsing/LocalReader';

const reader = new LocalReader();

try {
    const day = new Day14(reader);
    const a = day.solveA();
    const b = day.solveB();

    console.log(a);
    console.log(b);
} catch (err) {
    console.error(err);
}
