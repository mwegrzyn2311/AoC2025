import * as fs from 'fs';
import { BLANK_CHARS_REGEX, generateIndices, MULTIPLICATION, OPERATOR_TO_OPERATION, readMainFile, readTestFile, SUM } from '../../utils/utils';
import { Map2d } from '../../utils/map2d';
import { generateVecs, NEIGH_VECS, Vec2d } from '../../utils/vec2d';

export function day6part1() {
    //const lines = readTestFile(6);
    const lines = readMainFile(6);
    const numbersForMath: number[][] = lines.slice(0, -1)
        .map(line => line
            .split(BLANK_CHARS_REGEX)
            .map(numStr => parseInt(numStr)));

    const operatorsForMath: string[] = lines[lines.length - 1].split(BLANK_CHARS_REGEX);
    
    const sumOfOperations: number = Array.from({length: numbersForMath[0].length}, (_, i) => i)
        .map(index => getResultAtIndex(numbersForMath, operatorsForMath, index))
        .reduce(SUM, 0);
    
    console.log(sumOfOperations);
}

function getResultAtIndex(numbersForMath: number[][], operatorsForMath: string[], index: number) {
    let res: number = numbersForMath[0][index];
    const operation: (a: number, b: number) => number = OPERATOR_TO_OPERATION[operatorsForMath[index]];
    for (let i: number = 1; i < numbersForMath.length; i++) {
        res = operation(res, numbersForMath[i][index]);
    }
    return res;
}
