export class Vec2d {
    private x: number;
    private y: number;

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
        return new Vec2d(this.x + anotherVec.getX(), this.y +  anotherVec.getY());
    }
}

export const NEIGH_VECS: Vec2d[] = [
    new Vec2d(-1, -1), new Vec2d(-1, 0), new Vec2d(-1, 1),
     new Vec2d(0, -1), new Vec2d(0, 1),
      new Vec2d(1, -1), new Vec2d(1, 0), new Vec2d(1, 1)];

export function generateVecs(gridSize: Vec2d): Vec2d[] {
    return Array.from(Array(gridSize.getY()).keys())
        .map(y => Array.from(Array(gridSize.getX()).keys())
            .map(x => new Vec2d(x, y)))
        .flatMap(vecs => vecs);
}
