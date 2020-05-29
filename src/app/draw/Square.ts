export class Square {
    constructor(private ctx: CanvasRenderingContext2D) {}

    draw(x: number, y: number, w: number, h: number) {
      this.ctx.fillRect(h * x, w * y, h, w);
      this.ctx.strokeRect(h * x, w * y, h, w);
    }
}