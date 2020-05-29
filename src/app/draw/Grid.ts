export class Grid {
    private break: boolean;
    private rows: number;
    private columns: number;
    private gaps: Array<number>;
    private rowSize: number;
    private colSize: number;
    private elementCount: number;
    private canvasSize: Array<number>;
    
    constructor(canvasSize: Array<number>, rowSize: number = 50, colSize: number = 50, gaps: Array<number> = [10,10,10,10], rows: number = 0, columns: number = 0)
    {
        this.canvasSize = canvasSize;
        this.rowSize = rowSize;
        this.colSize = colSize;
        this.rows = (rows == 0 ? canvasSize[0]/(rowSize + gaps[0]) : rows);
        this.columns = (columns == 0 ? canvasSize[1]/(rowSize+gaps[2]) : columns);
        this.gaps = gaps;
        console.log("Canvas: "+this.rows+"x"+this.columns+"\n"+"rowSize: "+this.rowSize+"\ncolSize: "+this.colSize);
    }

}