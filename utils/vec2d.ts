export class Vec2d {
    private x: number;
    private y: number;

    private static cachedVecs: Map<number, Map<number, Vec2d>> = new Map();

    // I wanted use Sets nicely but APPARENTLY, SETS IN TypeScript COMPARE USING REFERENCE, NOT EQUALS - WHAT?!?!
    // So I'm creating this hack to overcome this limitation
    private static newCachedVec(x: number, y: number): Vec2d {
        if (Vec2d.cachedVecs.has(x)) {
            const vecsForX: Map<number, Vec2d> = Vec2d.cachedVecs.get(x);
            if (vecsForX.has(y)) {
                return vecsForX.get(y);
            } else {
                const newVecToCache: Vec2d = new Vec2d(x, y);
                vecsForX.set(y, newVecToCache);
                return newVecToCache;
            }
        } else {
            const newVecToCache: Vec2d = new Vec2d(x, y);
            const newMap: Map<number, Vec2d> = new Map();
            newMap.set(y, newVecToCache);
            Vec2d.cachedVecs.set(x, newMap);
            return newVecToCache;
        }
    }

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public add(anotherVec: Vec2d): Vec2d {
        return Vec2d.newCachedVec(this.x + anotherVec.getX(), this.y +  anotherVec.getY());
    }

    public equals(anoterVec: Vec2d): boolean {
        return this.x == anoterVec.getX() && this.y == anoterVec.getY();
    }
}

export const DOWN = new Vec2d(0, 1);
export const UP = new Vec2d(0, -1);
export const LEFT = new Vec2d(-1, 0);
export const RIGHT = new Vec2d(1, 0);
export const NEIGH_VECS: Vec2d[] = [
    new Vec2d(-1, -1), new Vec2d(1, -1), new Vec2d(-1, 1), new Vec2d(1, 1),
    LEFT, UP, DOWN, RIGHT];

export function generateVecs(gridSize: Vec2d): Vec2d[] {
    return Array.from(Array(gridSize.getY()).keys())
        .map(y => Array.from(Array(gridSize.getX()).keys())
            .map(x => new Vec2d(x, y)))
        .flatMap(vecs => vecs);
}
