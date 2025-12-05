import { Vec2d } from "./vec2d";

export class Map2d {
    private lines: string[];
    private size: Vec2d;

    constructor(lines: string[]) {
        this.lines = lines;
        this.size = new Vec2d(this.lines[0].length, this.lines.length);
    }

    public getChar(pos: Vec2d): string {
        return this.lines[pos.getY()][pos.getX()];
    }

    public getNum(pos: Vec2d): number {
        return parseInt(this.lines[pos.getY()][pos.getX()]);
    }
    
    public isInMap(pos: Vec2d): boolean {
        return pos.getX() >= 0 && pos.getX() < this.size.getX() && pos.getY() >= 0 && pos.getY() < this.size.getY();
    }

    public getSize(): Vec2d {
        return this.size;
    }

    public replace(pos: Vec2d, newVal: string) {
        this.lines[pos.getY()] = this.lines[pos.getY()].substring(0, pos.getX()) + newVal + this.lines[pos.getY()].substring(pos.getX() + 1, this.getSize().getX());
    }
}