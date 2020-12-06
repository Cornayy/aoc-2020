import { Day6 } from './days/6/6';
import { LocalReader } from './parsing/LocalReader';

const reader = new LocalReader();

try {
    const day = new Day6(reader);
    const a = day.solveA();
    const b = day.solveB();

    console.log(a);
    console.log(b);
} catch (err) {
    console.error(err);
}
