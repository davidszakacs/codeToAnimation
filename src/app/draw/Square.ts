export class Square {

  private x: number;
  private y: number;
  constructor(private ctx: CanvasRenderingContext2D, x:number, y:number) {
    this.x = x;
    this.y = y;
  }

  draw(w: number, h: number, spacingX: number, spacingY: number) {
    this.ctx.fillRect(h * this.x + spacingX, w * this.y + spacingY, h, w);
    this.ctx.strokeRect(h * this.x + spacingX, w * this.y + spacingY, h, w);
    console.log((h * this.x + spacingX) + " | " + (w * this.y + spacingY) + " | " +  h + " | " +  w);
  }
}