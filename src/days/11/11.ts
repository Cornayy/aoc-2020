import { IReader } from './../../parsing/IReader';
import { Day } from '../../Day';

enum STATE {
    Occupied = 'L',
    Empty = '#',
    Floor = '.',
}

type Row = string[];
type Grid = Row[];

interface Position {
    x: number;
    y: number;
}

export class Day11 extends Day {
    private readonly checks: [number, number][];
    private readonly grid: Grid;

    constructor(reader: IReader) {
        super(reader, 11);
        this.grid = this.input.map((line) => line.split(''));
        this.checks = [
            [-1, -1],
            [0, -1],
            [1, -1],
            [-1, 0],
            [1, 0],
            [-1, 1],
            [0, 1],
            [1, 1],
        ];
    }

    public solveA(): number {
        return this.process(this.grid, 4);
    }

    public solveB(): number {
        return this.process(this.grid, 5, true);
    }

    private process(grid: Grid, tolerance: number, useVisible?: boolean): number {
        const maxY = grid.length - 1;
        const maxX = grid[0].length - 1;

        let clone = this.clone(grid);
        let changed = true;

        while (changed) {
            const next = this.clone(clone);
            for (let y = 0; y <= maxY; y++) {
                for (let x = 0; x <= maxX; x++) {
                    const seat = clone[y][x];
                    if (seat === STATE.Floor) continue;

                    const adjacents = useVisible
                        ? this.visibleAdjacents(clone, { x, y })
                        : this.adjacents(clone, { x, y });

                    if (seat === STATE.Empty && adjacents === 0) {
                        next[y][x] = STATE.Occupied;
                    } else if (seat === STATE.Occupied && adjacents >= tolerance) {
                        next[y][x] = STATE.Empty;
                    }
                }
            }

            changed = !this.equal(clone, next);
            clone = next;
        }

        return clone
            .flatMap((row) => row)
            .reduce((sum, seat) => sum + (seat === STATE.Occupied ? 1 : 0), 0);
    }

    private adjacents(grid: Grid, { x, y }: Position): number {
        return this.checks.filter(([dx, dy]) => {
            const row = grid[y + dy];
            return row ? grid[y + dy][x + dx] === STATE.Occupied : false;
        }).length;
    }

    private visibleAdjacents(grid: Grid, { x, y }: Position): number {
        const inc = (v: [number, number], i: [number, number]): [number, number] => [
            v[0] + i[0],
            v[1] + i[1],
        ];

        return this.checks.filter(([dx, dy]) => {
            let offset: [number, number] = [dx, dy];
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const row = grid[y + offset[1]];
                const seat = row ? grid[y + offset[1]][x + offset[0]] : undefined;

                if (seat === undefined) {
                    return false;
                }
                if (seat !== STATE.Floor) {
                    return seat === STATE.Occupied;
                }
                offset = inc(offset, [dx, dy]);
            }
        }).length;
    }

    private equal(a: Grid, b: Grid): boolean {
        const maxY = a.length - 1;
        const maxX = a[0].length - 1;

        for (let y = 0; y <= maxY; y++) {
            for (let x = 0; x <= maxX; x++) {
                if (a[y][x] !== b[y][x]) {
                    return false;
                }
            }
        }
        return true;
    }

    private clone(original: Grid): Grid {
        return original.map((row) => [...row]);
    }
}
