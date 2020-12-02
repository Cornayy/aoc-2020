import { Day2 } from './02/02';
import { LocalReader } from './parsing/LocalReader';

const reader = new LocalReader();

try {
    const day = new Day2(reader, './src/02/input.txt');
    const a = day.solveA();

    console.log(a);
    //console.log(b);
} catch (err) {
    console.error(err);
}
