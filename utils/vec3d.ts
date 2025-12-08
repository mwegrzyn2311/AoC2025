export class Vec3d {
    private x: number;
    private y: number;
    private z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getZ(): number {
        return this.z;
    }

    public add(anotherVec: Vec3d): Vec3d {
        return new Vec3d(this.x + anotherVec.getX(), this.y +  anotherVec.getY(), this.z + anotherVec.getZ());
    }

    public subtract(anotherVec: Vec3d): Vec3d {
        return new Vec3d(this.x - anotherVec.getX(), this.y -  anotherVec.getY(), this.z - anotherVec.getZ());
    }

    public distSquare(anoterVec: Vec3d): number {
        return Math.pow(this.x - anoterVec.getX(), 2) + Math.pow(this.y - anoterVec.getY(), 2) + Math.pow(this.z - anoterVec.getZ(), 2);
    }

    public dist(anoterVec: Vec3d): number {
        return Math.sqrt(this.distSquare(anoterVec));
    }

    public equals(anoterVec: Vec3d): boolean {
        return this.x == anoterVec.getX() && this.y == anoterVec.getY() && this.z == anoterVec.getZ();
    }
}
