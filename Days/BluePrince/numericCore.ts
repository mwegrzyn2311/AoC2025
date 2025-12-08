import * as fs from 'fs';
import { readMainFile, readTestFile } from '../../utils/utils';

/**
 * Given multiple lines, each containing a number of upper-case 4-letter words, translate them to new words in such a fashion:
 * A = 1, B = 2, C = 3, ...
 * Calculate the numeric core of those numbers, then translate back to words
 * To calculate numeric core:
 * 1. Assign each letter an operation (+ - * /) [The first number must be assigned +]
 * 2. Find the lowest positive number that can be the result of the equation
 * 3. Repeat until the result is at least 4 digits
 *  (In such case, split the number into 4 smaller numbers but it's not defined which o these should be more than 1 digit in case of 5+ digit numbers)
 */

export function translateNumericCores() {
    const lines = readMainFile(26);
    var translatedWords: string[] = lines.map(fiveWordsStr => concatStrArr(
        fiveWordsStr
        .split(",")
        .map(wordStr => numToChar(numericCore(wordToFourNums(wordStr))))));
    console.log(translatedWords);
}

function numericCore(a: number[]): number {
    // Incomplete implementation warning: In theory should do that in loop until the result length is shorter than 4 digits
    //  but in most cases that's not necessary so skipping for now for simplicity
   return Math.min(...[((a[0] - a[1]) * a[2]) / a[3],
     ((a[0] - a[1]) / a[2]) * a[3],
      ((a[0] * a[1]) - a[2]) / a[3],
       ((a[0] * a[1]) / a[2]) - a[3],
        ((a[0] / a[1]) - a[2]) * a[3],
         ((a[0] / a[1]) * a[2]) - a[3]]
         .filter(sum => Number.isInteger(sum))
         .filter(sum => sum > 0));
}

function wordToFourNums(word: string): number[] {
    return [0, 1, 2, 3].map(pos => chartAtPosToNum(word, pos));
}

function chartAtPosToNum(word: string, pos: number): number {
    return word.charCodeAt(pos) - 64;

}

function numToChar(num: number): string {
    return String.fromCharCode(64 + num);
}

function concatStrArr(strArr: string[]): string {
    let res: string = '';
    strArr.forEach(str => res += str);
    return res;

}
