import * as fs from 'fs';
import { readMainFile, readTestFile } from '../../utils/utils';
import { Map2d } from '../../utils/map2d';
import { generateVecs, NEIGH_VECS, Vec2d } from '../../utils/vec2d';


export function day4part1() {
    //const lines = readTestFile(4);
    const lines = readMainFile(4);

    const grid = new Map2d(lines);
    const rollsWithLessThan4NeighbouringRolls = generateVecs(grid.getSize())
        .filter(currPos => grid.getChar(currPos) === '@')
        .map(currPos => NEIGH_VECS
            .map(neighVec => currPos.add(neighVec))
            .filter(neigh => grid.isInMap(neigh))
            .filter(neigh => grid.getChar(neigh) === '@')
            .length)
        .filter(neighbouringRollsCount => neighbouringRollsCount < 4)
        .length;
    console.log(rollsWithLessThan4NeighbouringRolls);
}

export function day4part2() {
    //const lines = readTestFile(4);
    const lines = readMainFile(4);
    
    const grid = new Map2d(lines);
    let totalRes: number = 0;
    while(true) {
        const positionsToUpdate = generateVecs(grid.getSize())
            .filter(currPos => grid.getChar(currPos) === '@')
            .filter(currPos => NEIGH_VECS
                .map(neighVec => currPos.add(neighVec))
                .filter(neigh => grid.isInMap(neigh))
                .filter(neigh => grid.getChar(neigh) === '@')
                .length < 4);
        if (positionsToUpdate.length == 0) {
            break;
        }
        totalRes += positionsToUpdate.length;
        positionsToUpdate.forEach(pos => grid.replace(pos, '.'));
    }

    
    console.log(totalRes);
}
