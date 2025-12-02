import * as fs from 'fs';
import { readMainFile, readTestFile } from '../../utils/utils';

const lockSize = 100;
const initialPointer = 50;

export function day1part1() {
    // const lines = readTestFile(1);
    const lines = readMainFile(1);
    let pointer: number = initialPointer;
    let counter: number = 0;
    lines.forEach(line => {
        pointer = specialModulo(moveLock(pointer, line));
        if (pointer === 0)
            counter++;
    });
    console.log(counter);
}

export function day1part2() {
    //const lines = readTestFile(1);
    const lines = readMainFile(1);
    let pointer: number = initialPointer;
    let counter: number = 0;
    lines.forEach(line => {
        const preModuloPosition: number = moveLock(pointer, line);
        if (preModuloPosition > pointer) {
            counter += Math.floor(preModuloPosition / 100);
        } else if (preModuloPosition <= 0) {
            counter += Math.floor(preModuloPosition * -1 / 100) + (pointer === 0 ? 0 : 1);
        }
        pointer = specialModulo(preModuloPosition);
    });
    console.log(counter);
}

function moveLock(currPointer: number, movementStr: string): number {
    return currPointer + (movementStr[0] == 'R' ? 1 : -1) * parseInt(movementStr.substring(1));
}

function specialModulo(num: number) {
    return (num % lockSize + lockSize) % lockSize;
}
