import * as fs from 'fs';

export function readTestFile(dayNumber: number) : string[] {
    return readFile(`./testFiles/day${dayNumber}/test.txt`);
}

export function readMainFile(dayNumber: number) : string[] {
    return readFile(`./testFiles/day${dayNumber}/day${dayNumber}.txt`);
}

function readFile(path: string): string[] {
    return fs.readFileSync(path, 'utf-8').split("\n");
}