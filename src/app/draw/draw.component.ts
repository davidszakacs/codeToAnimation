import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Square } from './Square';
import { CodeParser } from './CodeParser';
import { ReadVarExpr, ThrowStmt } from '@angular/compiler';
import { randomFill } from 'crypto';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;  

  private ctx: CanvasRenderingContext2D;
  private code: string;
  private file: any;
  private parser: CodeParser;
  
  constructor() { }

  public ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }
  
  public fileChanged(e) {
      this.file = e.target.files[0];
      console.log("file changed");
  }

  private callParser(temp: string): void  {
    // saving the code from the file
    this.code = temp;
    console.log(this.code);

    // calling the code parser and disassembling the code to variables, operations and functions
    this.parser = new CodeParser(this.code);
    this.parser.disassemble();

    // saving the parsed variables into a variable
    var arrays = this.parser.getArrays();
    var variables = this.parser.getVariables();

    // making an array of squares that will be drawn
    let squares: Array<Square[]>;
    squares = new Array();
    let arrHeight: number = 1;
    let x: number = 0;

    // making the square objects for each array
    arrays.forEach(item => {
      console.log("item: "+item);
      this.ctx.fillStyle = 'red';
      let temp: Array<Square> = new Array();
      squares.push(temp);
      // drawing out the array squares
      for(var i = 0; i < item[1]; i++)
      {
        squares[x][i] = new Square(this.ctx);
        squares[x][i].draw(1+i*2, arrHeight, 35, 20);
      }
      this.ctx.font = "15px Arial";
      this.ctx.fillText(item[0], 20, arrHeight*32);
      arrHeight+=2;
      x++;
    });

    // making the square objects for each variable
    squares.push(new Array());
    let i: number = 0;
    variables.forEach(item => {
      this.ctx.fillStyle = 'blue';
      squares[x][i] = new Square(this.ctx);
      squares[x][i].draw(1+i*2, arrHeight, 35, 20);
      this.ctx.font = "15px Arial";
      this.ctx.fillText(item, 20, arrHeight*32);
    });
  }

  public uploadDocument() {
    let fileReader = new FileReader();
    fileReader.readAsText(this.file);
    fileReader.onload = () => {
      this.callParser(fileReader.result.toString());
    };
  }

  public animate(): void {
  }

}