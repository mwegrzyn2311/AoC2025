import * as fs from 'fs';
import { readMainFile, readTestFile } from '../../utils/utils';


export function day3part1() {
    //const lines = readTestFile(3);
    const lines = readMainFile(3);
    const voltageSum: number = lines.map(batteryStr => {
        // The first digit will be the first encountered maximum of all digits except the last one
        const [firstDigit, firstDigitIndex] = findMaxNumAndIndex(batteryStr, 0, batteryStr.length - 1);
        const [secondDigit, ignored] = findMaxNumAndIndex(batteryStr, firstDigitIndex + 1, batteryStr.length);
        return 10 * firstDigit + secondDigit;
    }).reduce((a, b) => a + b, 0);
    console.log(voltageSum);
}

export function day3part2() {
    //const lines = readTestFile(3);
    const lines = readMainFile(3);
    const voltageSum: number = lines.map(batteryStr => {
        let res: number = 0;
        let startIndex: number = 0;
        for (let i = 11; i >= 0; i--) {
            const [maxDigit, foundIndex] = findMaxNumAndIndex(batteryStr, startIndex, batteryStr.length - i);
            startIndex = foundIndex + 1;
            res = (res * 10) + maxDigit;
        }
        return res;
    }).reduce((a, b) => a + b, 0);
    console.log(voltageSum);
}

function findMaxNumAndIndex(digitsStr: string, startI: number, endI: number): [number, number] {
    let maxNum: number = 0;
    let maxI: number = 0;
    
    for (; startI < endI; startI++) {
        let currNum: number = parseInt(digitsStr[startI]);
        if (currNum > maxNum) {
            maxNum = currNum;
            maxI = startI;
        }
        if (maxNum == 9) {
            break;
        }
    }

    return [maxNum, maxI];
}
