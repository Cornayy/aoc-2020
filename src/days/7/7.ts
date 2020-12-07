import { IReader } from './../../parsing/IReader';
import { Day } from '../../Day';

const SHINY_BAG = 'shiny gold bag';
const NO_BAGS = 'no other bags.';

type Bag = string;

interface BagAmount {
    amount: number;
    bag: Bag;
}

export class Day7 extends Day {
    private readonly bags: Map<Bag, BagAmount[]>;

    constructor(reader: IReader) {
        super(reader, 7);
        this.bags = new Map<Bag, BagAmount[]>();

        for (const line of this.input) {
            const [bag, amounts] = line.split(' contain ');
            const parsedAmounts = amounts
                .split(', ')
                .map((amount) => {
                    if (amount === NO_BAGS) return undefined;
                    const [num, ...bag] = amount.split(' ');
                    return {
                        amount: parseInt(num),
                        bag: this.depluralize(this.sanitize(bag.join(' '))),
                    };
                })
                .filter((entry) => entry);

            this.bags.set(this.depluralize(bag), parsedAmounts);
        }
    }

    public solveA(): number {
        const findHolders = (bagId: string): string[] => {
            const holders = [...this.bags]
                .filter(([, amount]) => amount.some((b) => b.bag === bagId))
                .map(([bag]) => bag);

            // Remove duplicates and append each bag after each recursive call.
            return [...new Set([...holders, ...holders.flatMap(findHolders)])];
        };

        return findHolders(SHINY_BAG).length;
    }

    public solveB(): number {
        const childCount = (amount: BagAmount[]): number => {
            return amount.reduce(
                (t, c) => t + c.amount * (1 + (this.get(c.bag) ? childCount(this.get(c.bag)) : 0)),
                0
            );
        };

        return childCount(this.bags.get(SHINY_BAG));
    }

    private get(bag: Bag): BagAmount[] {
        return this.bags.get(bag);
    }

    private depluralize(value: string): string {
        return value.charAt(value.length - 1) === 's' ? value.slice(0, value.length - 1) : value;
    }

    private sanitize(value: string): string {
        return value.replace('.', '');
    }
}
