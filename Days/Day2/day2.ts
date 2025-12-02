import { readMainFile, readTestFile } from '../../utils/utils';

export function day2part1() {
    //const input: string = readTestFile(2)[0];
    const input: string = readMainFile(2)[0];

    const idRanges: string[] = input.split(',');
    let invalidIdsSum: number = 0;
    let totalRes: number = 0;
    idRanges.forEach(idRangeStr => {
        const startAndEnd: string[] = idRangeStr.split('-');
        const rangeStart: number = parseInt(startAndEnd[0]);
        const rangeEnd: number = parseInt(startAndEnd[1]);

        let iterStart: number = getClosestHalfLenStart(rangeStart);
        let numToCheck: number = numNum(iterStart);
        let partialRes: number = 0;
        while (numToCheck <= rangeEnd) {
            partialRes += numToCheck;
            iterStart++;
            numToCheck = numNum(iterStart);
        }
        totalRes += partialRes;
    });
    console.log(totalRes);
}

function getClosestHalfLenStart(rangeStart: number): number {
    let len: number = rangeStart.toString().length;
    if (len % 2 === 0) {
        let resStr: string = rangeStart.toString().substring(0, len / 2);
        return parseInt(resStr + resStr) >= rangeStart ? parseInt(resStr) : parseInt(resStr) + 1;
    } else {
        return Math.pow(10, (len - 1) / 2);
    }
    
}

function numNum(singleNumber: number): number {
    return parseInt(singleNumber.toString() + singleNumber.toString());
}