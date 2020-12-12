import { IReader } from './../../parsing/IReader';
import { Day } from '../../Day';

const DIRECTIONS = ['N', 'E', 'S', 'W'];

interface Instruction {
    direction: string;
    value: number;
}

interface Position {
    x: number;
    y: number;
}

export class Day12 extends Day {
    private readonly instructions: Instruction[];
    private waypoint: Position;
    private position: Position;
    private direction: string;

    constructor(reader: IReader) {
        super(reader, 12);
        this.instructions = this.input.map((entry) => ({
            direction: entry.charAt(0),
            value: parseInt(entry.slice(1)),
        }));
    }

    public solveA(): number {
        this.start();
        return this.travel();
    }

    public solveB(): number {
        this.start();
        return this.travel(true);
    }

    private travel(waypoint?: boolean): number {
        for (const { direction, value } of this.instructions) {
            waypoint ? this.moveToWaypoint({ direction, value }) : this.move({ direction, value });
        }

        return Math.abs(this.position.x) + Math.abs(this.position.y);
    }

    private move({ direction, value }: Instruction): void {
        let index = 0;

        switch (direction) {
            case 'N':
                this.position.y += value;
                break;
            case 'E':
                this.position.x += value;
                break;
            case 'S':
                this.position.y -= value;
                break;
            case 'W':
                this.position.x -= value;
                break;
            case 'F':
                this.move({ direction: this.direction, value });
                break;
            case 'L':
                index = (DIRECTIONS.indexOf(this.direction) - value / 90) % DIRECTIONS.length;
                this.direction = DIRECTIONS[index >= 0 ? index : DIRECTIONS.length + index];
                break;
            case 'R':
                index = (DIRECTIONS.indexOf(this.direction) + value / 90) % DIRECTIONS.length;
                this.direction = DIRECTIONS[index >= 0 ? index : DIRECTIONS.length + index];
                break;
        }
    }

    private moveToWaypoint({ direction, value }: Instruction): void {
        switch (direction) {
            case 'N':
                this.waypoint.y -= value;
                break;
            case 'E':
                this.waypoint.x += value;
                break;
            case 'S':
                this.waypoint.y += value;
                break;
            case 'W':
                this.waypoint.x -= value;
                break;
            case 'F':
                this.position.x += this.waypoint.x * value;
                this.position.y += this.waypoint.y * value;
                break;
            case 'L':
                {
                    let turns = value / 90;
                    while (turns) {
                        this.waypoint = {
                            x: this.waypoint.y * 1,
                            y: this.waypoint.x * -1,
                        };
                        turns--;
                    }
                }
                break;
            case 'R':
                {
                    let turns = value / 90;
                    while (turns) {
                        this.waypoint = {
                            x: this.waypoint.y * -1,
                            y: this.waypoint.x * 1,
                        };
                        turns--;
                    }
                }
                break;
        }
    }

    private start(): void {
        this.position = { x: 0, y: 0 };
        this.waypoint = { x: 10, y: -1 };
        this.direction = 'E';
    }
}
