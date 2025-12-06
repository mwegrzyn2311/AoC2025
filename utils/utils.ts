import * as fs from 'fs';

export const BLANK_CHARS_REGEX = /\s+/;
export const SUM: (a: number, b: number) => number = (a: number, b: number) => a + b;
export const MULTIPLICATION: (a: number, b: number) => number = (a: number, b: number) => a * b;
export const OPERATOR_TO_OPERATION = {
    '+': SUM,
    '*': MULTIPLICATION,
};

export function readTestFile(dayNumber: number) : string[] {
    return readFile(`./testFiles/day${dayNumber}/test.txt`);
}

export function readMainFile(dayNumber: number) : string[] {
    return readFile(`./testFiles/day${dayNumber}/day${dayNumber}.txt`);
}

function readFile(path: string): string[] {
    return fs.readFileSync(path, 'utf-8')
    .split("\n")
    .map(line => line.trimEnd());
}

// Generates range; e.g. for 6 will return [0, 1, 2, 3, 4, 5]
export function generateIndices(len: number): number[] {
    return Array.from({length: len}, (_, i) => i);
}