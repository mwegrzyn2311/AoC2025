import * as fs from 'fs';
import { readMainFile, readTestFile } from '../../utils/utils';
import { Map2d } from '../../utils/map2d';
import { generateVecs, NEIGH_VECS, Vec2d } from '../../utils/vec2d';


export function day5part1() {
    //const lines = readTestFile(5);
    const lines = readMainFile(5);

    const [mergedRanges, lastIndex]: [[number, number][], number] = constructAndMergeRanges(lines);
    const fitInRanges: number = lines.slice(lastIndex + 1, lines.length)
        .map(numStr => parseInt(numStr))
        .filter(num => isInMergedRanges(mergedRanges, num))
        .length;
    
    console.log(fitInRanges);
}

export function day5part2() {
    //const lines = readTestFile(5);
    const lines = readMainFile(5);

    const [mergedRanges, ignored]: [[number, number][], number] = constructAndMergeRanges(lines);
    const rangesLenSum: number = mergedRanges
        .map(range => range[1] - range[0] + 1)
        .reduce((a, b) => a + b, 0);
    
    console.log(rangesLenSum);
}

function constructAndMergeRanges(lines: string[]): [[number, number][], number] {
    let i: number = 0;
    let ranges: [number, number][] = [];
    while (lines[i]) {
        const rangeStartAndEnd: string[] = lines[i++].split('-');
        ranges.push([parseInt(rangeStartAndEnd[0]), parseInt(rangeStartAndEnd[1])]);
    }
    const mergedRanges: [number, number][] = mergeOverlappingRanges(sortRanges(ranges));
    return [mergedRanges, i];
}


function isInMergedRanges(mergedRanges: [number, number][], numberToCheck: number): boolean {
    return mergedRanges.filter(range => numberToCheck <= range[1] && numberToCheck >= range[0]).length > 0;
}

function sortRanges(ranges: [number, number][]): [number, number][] {
    return ranges.sort((range1, range2) => range1[0] === range2[0] ? range1[1] - range2[1] : range1[0] - range2[0]);
}

function mergeOverlappingRanges(ranges: [number, number][]): [number, number][] {
    let merged: [number, number][] = [];
    for (let i = 0; i < ranges.length;) {
        let newRange: [number, number] = [ranges[i][0], ranges[i][1]];
        i++;
        while(i < ranges.length && ranges[i][0] <= newRange[1] + 1) {
            newRange[1] = Math.max(newRange[1], ranges[i][1]);
            i++;
        }
        merged.push(newRange);
    }
    return merged;
}
