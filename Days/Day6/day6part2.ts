import * as fs from 'fs';
import { BLANK_CHARS_REGEX, generateIndices, MULTIPLICATION, OPERATOR_TO_OPERATION, readMainFile, readTestFile, SUM } from '../../utils/utils';
import { Map2d } from '../../utils/map2d';
import { generateVecs, NEIGH_VECS, Vec2d } from '../../utils/vec2d';

export function day6part2() {
    //const lines = readTestFile(6);
    const lines = readMainFile(6);
    const numbersLines: string[] = lines.slice(0, -1);
    const operatorsLine: string = lines[lines.length - 1];

    let lastOpIndex: number = 0;
    let res: number = 0;
    for (let i : number = 0; i < operatorsLine.length; ++i) {
        while(i < operatorsLine.length && operatorsLine[++i] == ' ');

        const tmp: number = getTotalForColumn(getNumsForCurrOp(lastOpIndex, i, numbersLines), operatorsLine[lastOpIndex]);
        res += tmp;
        lastOpIndex = i++;
    }
    const simulatedNextOpIndex = Math.max(...numbersLines.map(line => line.length)) + 1;
    res += getTotalForColumn(getNumsForCurrOp(lastOpIndex, simulatedNextOpIndex, numbersLines), operatorsLine[lastOpIndex]);
    console.log(res);
}

function getNumsForCurrOp(lastOpIndex: number, currOpIndex: number, numbersLines: string[]): number[] {
    return generateIndices(currOpIndex - lastOpIndex - 1)
            .map(index => index + lastOpIndex)
            .reverse()
            .map(columnIndex => numbersLines
                .filter(numbersLine => columnIndex < numbersLine.length)
                .map(numbersLine => numbersLine[columnIndex])
                .filter(digitStr => digitStr != ' ')
                .map(digitStr => parseInt(digitStr))
                .reduce((a: number, b: number) => a * 10 + b, 0));
}

function getTotalForColumn(columNums: number[], operator: string): number {
    return columNums
        .slice(1, columNums.length)
        .reduce(OPERATOR_TO_OPERATION[operator], columNums[0]);
}







// This turned out to not be necessary because I misunderstood the assignment but it's still a nice piece of code so I'm keeping it...
/**
 * transform each column to digits read from right to left, from top to bottom
 *  e.g. [44, 431, 55, 6] will become [1, 435, 4456]
 * @param numbersForMath 
 * @returns 
 */
function transformNumbersForPart2(numbersForMath: number[][]): number[][] {
    const rowIndices: number[] = generateIndices(numbersForMath.length);

    return generateIndices(numbersForMath[0].length)
        .map(columnIndex => rowIndices
            .map(rowIndex => numbersForMath[rowIndex][columnIndex].toString()))
        .map(numsAsStr => {
            const longestNumLen: number = Math.max(...generateIndices(numsAsStr.length)
                .map(numI => numsAsStr[numI].length));
            return generateIndices(longestNumLen).reverse()
                .map(digitIndex => numsAsStr
                    .filter(numStr => numStr.length > digitIndex)
                    .map(numStr => parseInt(numStr[digitIndex]))
                    .reduce((a, b) => a * 10 + b, 0));
        })
}

