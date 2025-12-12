import * as fs from 'fs';
import { BLANK_CHARS_REGEX, generateIndices, MULTIPLICATION, OPERATOR_TO_OPERATION, readMainFile, readTestFile, SUM } from '../../utils/utils';
import { Map2d } from '../../utils/map2d';
import { DOWN, generateVecs, LEFT, NEIGH_VECS, RIGHT, Vec2d } from '../../utils/vec2d';
import { Vec3d } from '../../utils/vec3d';

export function day9part1() {
    //const lines = readTestFile(9);
    const lines = readMainFile(9);

    const corners: Vec2d[] = lines
        .map(line => line.split(','))
        .map(vecPartsStr => Vec2d.newCachedVec(parseInt(vecPartsStr[0]), parseInt(vecPartsStr[1])));


    const areas: number[] = []
    for (let i = 0; i < corners.length; i++) {
        for (let j = i + 1; j < corners.length; j++) {
            areas.push(corners[i].areaBetween(corners[j]));
        }
    }

    console.log(Math.max(...areas));
}

export function day9part2() {
    //const lines = readTestFile(9);
    const lines = readMainFile(9);

    const corners: Vec2d[] = lines
        .map(line => line.split(','))
        .map(vecPartsStr => Vec2d.newCachedVec(parseInt(vecPartsStr[0]), parseInt(vecPartsStr[1])));

    const sides: [Vec2d, Vec2d][] = Array.from({length: corners.length}, (_, i) => [corners[i], corners[(i + 1) % corners.length]]);
    const verticalSides: [Vec2d, Vec2d][] = sides.filter(side => side[0].getX() == side[1].getX());
    const horizontalSides: [Vec2d, Vec2d][] = sides.filter(side => side[0].getY() == side[1].getY());

    console.log(verticalSides.filter(side => Math.abs(side[0].getY() - side[1].getY()) == 1));
    console.log(horizontalSides.filter(side => Math.abs(side[0].getX() - side[1].getX()) == 1));

    const areas: number[] = []
    for (let i = 0; i < corners.length; i++) {
        for (let j = i + 1; j < corners.length; j++) {
            const corner1: Vec2d = corners[i];
            const corner2: Vec2d = corners[j];
            if (allGreen(corner1, corner2, verticalSides, horizontalSides)) {
                areas.push(corners[i].areaBetween(corners[j]));
            }
        }
    }

    console.log(Math.max(...areas));
}

function allGreen(corner1: Vec2d, corner2: Vec2d, verticalSides: [Vec2d, Vec2d][], horizontalSides: [Vec2d, Vec2d][]): boolean {
    const leftVertX = Math.min(corner1.getX(), corner2.getX());
    const rightVertX  = Math.max(corner1.getX(), corner2.getX());
    const lowerVertY = Math.min(corner1.getY(), corner2.getY());
    const upperVertY = Math.max(corner1.getY(), corner2.getY());

    // check vertical
    if (leftVertX != rightVertX) {
        if (verticalSides.filter(side => 
            // side is between two vert sides
            side[0].getX() < rightVertX && side[0].getX() > leftVertX && 
            // inside means bad
            (((side[0].getY() > lowerVertY && side[0].getY() < upperVertY) || (side[1].getY() > lowerVertY && side[1].getY() < upperVertY)) ||
            // crosses from both sides
            (Math.max(side[0].getY(), side[1].getY()) >= upperVertY && Math.min(side[0].getY(), side[1].getY()) <= lowerVertY))).length > 0) {
                return false;
            }
    }

    // check horizontal
    if (lowerVertY != upperVertY) {
        if (horizontalSides.filter(side => 
            // side is between two horizontal sides
            side[0].getY() < upperVertY && side[0].getY() > lowerVertY && 
            // inside means bad
            (((side[0].getX() > leftVertX && side[0].getX() < rightVertX) || (side[1].getX() > leftVertX && side[1].getX() < rightVertX)) ||
            // crosses from both sides
            (Math.max(side[0].getX(), side[1].getX()) >= rightVertX && Math.min(side[0].getX(), side[1].getX()) <= leftVertX))).length > 0) {
                return false;
            }
    }
    
    return true;
}
