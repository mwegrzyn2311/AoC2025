import { readMainFile, readTestFile } from '../../utils/utils';

export function day2part2() {
    //const input: string = readTestFile(2)[0];
    const input: string = readMainFile(2)[0];

    const idRanges: string[] = input.split(',');
    let totalRes: number = 0;

    idRanges.forEach(idRangeStr => {
        const startAndEnd: string[] = idRangeStr.split('-');
        const rangeStart: number = parseInt(startAndEnd[0]);
        const rangeEnd: number = parseInt(startAndEnd[1]);

        let foundNums: Set<number> = new Set();
        for (let i = 2; i <= startAndEnd[1].length; i++) {
            let iterStart: number = getClosestPartLenStart(rangeStart, i);
            let numToCheck: number = repeatNum(iterStart, i);
            
            while (numToCheck <= rangeEnd) {
                if (!foundNums.has(numToCheck)) {
                    totalRes += numToCheck;
                    foundNums.add(numToCheck);
                }
                iterStart++;
                numToCheck = repeatNum(iterStart, i);
            }
        }
    });
    console.log(totalRes);
}

function getClosestPartLenStart(rangeStart: number, part: number): number {
    let len: number = rangeStart.toString().length;
    if (len % part === 0) {
        let resStr: string = rangeStart.toString().substring(0, len / part);
        return repeatNum(parseInt(resStr), part) >= rangeStart ? parseInt(resStr) : parseInt(resStr) + 1;
    } else {
        return Math.pow(10, (len - len % part) / part);
    }
    
}

function repeatNum(singleNumber: number, times: number): number {
    const singleNumStr = singleNumber.toString();
    let resStr: string = singleNumStr;
    for (let i = 1; i < times; i++) {
        resStr += singleNumStr;
    }
    return parseInt(resStr);
}