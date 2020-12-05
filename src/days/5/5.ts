import { IReader } from './../../parsing/IReader';
import { Day } from '../../Day';

interface TableInformation {
    min: number;
    max: number;
}

export class Day5 extends Day {
    constructor(reader: IReader) {
        super(reader, 5);
    }

    public solveA(): number {
        return Math.max(...this.input.map((ticket) => this.id(ticket)));
    }

    public solveB(): number {
        const seats = new Set<number>(this.input.map((ticket) => this.id(ticket)));
        for (const seat of seats) {
            // Empty spot between seats.
            if (!seats.has(seat + 1) && seats.has(seat + 2)) {
                return seat + 1;
            }
        }

        throw new Error('No empty spot was found in the provided list of boarding passes.');
    }

    private id(ticket: string): number {
        const [row, col] = this.space(ticket, 0, { min: 0, max: 127 }, { min: 0, max: 7 });
        return row * 8 + col;
    }

    private space(
        ticket: string,
        index: number,
        row: TableInformation,
        col: TableInformation
    ): [number, number] {
        const midRow = (row.max + row.min) / 2;
        const midCol = (col.max + col.min) / 2;

        if (ticket[index] === 'F') row.max = Math.floor(midRow);
        if (ticket[index] === 'B') row.min = Math.ceil(midRow);
        if (ticket[index] === 'L') col.max = Math.floor(midCol);
        if (ticket[index] === 'R') col.min = Math.ceil(midCol);

        if (index === ticket.length - 1) return [row.min, col.min];
        return this.space(
            ticket,
            ++index,
            { min: row.min, max: row.max },
            { min: col.min, max: col.max }
        );
    }
}
