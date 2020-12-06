export interface IReader {
    read(day: number): string[];
    string(day: number): string;
}
