import * as fs from 'fs';
import { BLANK_CHARS_REGEX, generateIndices, MULTIPLICATION, OPERATOR_TO_OPERATION, readMainFile, readTestFile, SUM } from '../../utils/utils';
import { Map2d } from '../../utils/map2d';
import { DOWN, generateVecs, LEFT, NEIGH_VECS, RIGHT, Vec2d } from '../../utils/vec2d';
import { Vec3d } from '../../utils/vec3d';

export function day8part1() {
    const ITERATIONS: number = 1000;
    //const lines = readTestFile(8);
    const lines = readMainFile(8);

    const vectors: Vec3d[] = lines
        .map(line => line.split(','))
        .map(vecStrFrags => new Vec3d(parseInt(vecStrFrags[0]), parseInt(vecStrFrags[1]), parseInt(vecStrFrags[2])));

    // (index1, index2) => dist^2
    let dists: Map<Vec2d, number> = new Map();
    for (let idx1: number = 0; idx1 < vectors.length; idx1++) {
        for (let idx2: number = idx1 + 1; idx2 < vectors.length; idx2++) {
            dists.set(Vec2d.newCachedVec(idx1, idx2), vectors[idx1].distSquare(vectors[idx2]));
        }
    }
    console.log("initialized");
    const shortestDistsIndices = [...dists.entries()]
        .sort((e1, e2) => e1[1] - e2[1])
        .map(entry => entry[0])
        .slice(0, ITERATIONS);
    console.log("sorted");

    let indicesSets: Set<number>[] = vectors.map((_, i) => new Set([i]));

    shortestDistsIndices.forEach(indices => {
        const setsWithIndices: Set<number>[] = indicesSets.filter(indicesSet => indicesSet.has(indices.getX()) ||  indicesSet.has(indices.getY()));
        switch(setsWithIndices.length) {
            case 1:
                // Only one will get added because it's a set
                const setWithIndices: Set<number> = setsWithIndices[0];
                setWithIndices.add(indices.getX());
                setWithIndices.add(indices.getY());
                break;
            case 2:
                // merge two circuits into one
                indicesSets = indicesSets.filter(sets => sets != setsWithIndices[0] && sets != setsWithIndices[1]);
                indicesSets.push(new Set([...setsWithIndices[0], ...setsWithIndices[1]]));
                break;
            default:
                console.log("BUG :C");
        }
    });

    const res: number = indicesSets
        .map(set => set.size)
        .sort((a, b) => a - b)
        .reverse()
        .slice(0, 3)
        .reduce(MULTIPLICATION, 1);
    console.log(res);
}

// TODO: Should extract common code but I'm frustrated by wasting time over JavaScript stupid sorting
export function day8part2() {
    //const lines = readTestFile(8);
    const lines = readMainFile(8);

    const vectors: Vec3d[] = lines
        .map(line => line.split(','))
        .map(vecStrFrags => new Vec3d(parseInt(vecStrFrags[0]), parseInt(vecStrFrags[1]), parseInt(vecStrFrags[2])));

    // (index1, index2) => dist^2
    let dists: Map<Vec2d, number> = new Map();
    for (let idx1: number = 0; idx1 < vectors.length; idx1++) {
        for (let idx2: number = idx1 + 1; idx2 < vectors.length; idx2++) {
            dists.set(Vec2d.newCachedVec(idx1, idx2), vectors[idx1].distSquare(vectors[idx2]));
        }
    }
    console.log("initialized");
    const shortestDistsIndices = [...dists.entries()]
        .sort((e1, e2) => e1[1] - e2[1])
        .map(entry => entry[0]);
    console.log("sorted");

    let indicesSets: Set<number>[] = vectors.map((_, i) => new Set([i]));

    shortestDistsIndices.forEach(indices => {
        const setsWithIndices: Set<number>[] = indicesSets.filter(indicesSet => indicesSet.has(indices.getX()) ||  indicesSet.has(indices.getY()));
        switch(setsWithIndices.length) {
            case 1:
                // Only one will get added because it's a set
                const setWithIndices: Set<number> = setsWithIndices[0];
                setWithIndices.add(indices.getX());
                setWithIndices.add(indices.getY());
                break;
            case 2:
                // merge two circuits into one
                indicesSets = indicesSets.filter(sets => sets != setsWithIndices[0] && sets != setsWithIndices[1]);
                indicesSets.push(new Set([...setsWithIndices[0], ...setsWithIndices[1]]));
                break;
            default:
                console.log("BUG :C");
        }
        if (indicesSets.length == 1) {
            console.log(vectors[indices.getX()].getX() * vectors[indices.getY()].getX());
            // workaround for break
            throw {};
        }
    });
}
