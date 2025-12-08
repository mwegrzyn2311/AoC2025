import * as fs from 'fs';
import { BLANK_CHARS_REGEX, generateIndices, MULTIPLICATION, OPERATOR_TO_OPERATION, readMainFile, readTestFile, SUM } from '../../utils/utils';
import { Map2d } from '../../utils/map2d';
import { DOWN, generateVecs, LEFT, NEIGH_VECS, RIGHT, Vec2d } from '../../utils/vec2d';

export function day7part1() {
    //const lines = readTestFile(7);
    const lines = readMainFile(7);

    const map: Map2d = new Map2d(lines);
    const start: Vec2d = findStart(map);
    let rays: Set<Vec2d> = new Set();
    rays.add(start);
    let totalSplits: number = 0;
    for (let y: number = 1; y < map.getSize().getY(); y++) {
        rays = Array.from(rays).map(ray => {
            const underPos: Vec2d = ray.add(DOWN);
            if (map.getChar(underPos) == '^') {
                totalSplits++;
                return [underPos.add(LEFT), underPos.add(RIGHT)];
            } else {
                return [underPos];
            }
        })
        .flatMap(positions => positions)
        .reduce((newSet: Set<Vec2d>, currVal: Vec2d) => newSet.add(currVal), new Set());
    }
    console.log(totalSplits);
}

export function day7part2() {
    //const lines = readTestFile(7);
    const lines = readMainFile(7);

    const map: Map2d = new Map2d(lines);
    const start: Vec2d = findStart(map);
    let rays: Map<Vec2d, number> = new Map();
    rays.set(start, 1);
    for (let y: number = 1; y < map.getSize().getY(); y++) {
        rays = Array.from(rays).map(([rayPos, times]) => {
            const underPos: Vec2d = rayPos.add(DOWN);
            const tmpMap: Map<Vec2d, number> = new Map();
            if (map.getChar(underPos) == '^') {
                tmpMap.set(underPos.add(LEFT), times);
                tmpMap.set(underPos.add(RIGHT), times);
            } else {
                tmpMap.set(underPos, times);
            }
            return tmpMap;
        })
        .reduce((newMap: Map<Vec2d, number>, tmpMap: Map<Vec2d, number>) => {
            tmpMap.forEach((times: number, rayPos: Vec2d) => {
                newMap.has(rayPos) ? newMap.set(rayPos, newMap.get(rayPos) + times) : newMap.set(rayPos, times);
            })
            return newMap;
        }, new Map());
    }
    console.log(Array.from(rays.values()).reduce(SUM, 0));
}

function findStart(map: Map2d): Vec2d {
    for (let i = 0; i < map.getSize().getX(); i++) {
        const currPos: Vec2d = new Vec2d(i, 0);
        if (map.getChar(currPos) === 'S') {
            return currPos;
        }
    }
}
