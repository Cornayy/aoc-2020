import { Day12 } from './days/12/12';
import { LocalReader } from './parsing/LocalReader';

const reader = new LocalReader();

try {
    const day = new Day12(reader);
    const a = day.solveA();
    const b = day.solveB();

    console.log(a);
    console.log(b);
} catch (err) {
    console.error(err);
}
