import { start } from 'repl';
import { ElementFinder } from 'protractor';

export class CodeParser {
    private code: string;
    private C_TYPES: string[] = this.tupleArray("int", "string", "char", "double", "float", "short");
    private variables: Array<[string, number]>;

    constructor(code: string)
    {
        this.code = code;
        this.variables = new Array();
    }

    public disassemble(): void {
        var lines = this.code.split("\n");
        lines.forEach(line => {
            if(!this.isBlank(line))
            {
                var declaration = this.isDeclaration(line);
                if(declaration[1] >= 0)
                {
                    console.log("a valtozo merete: "+declaration[1]+" | a neve: "+declaration[0]);
                    this.variables.push(declaration);
                }
            }
        });
    }

    // returns an array of all the declared arrays
    public getArrays(): Array<[string, number]> {
        let arrays: Array<[string, number]> = new Array();
        this.variables.forEach(element => {
            if(element[1] > 0)
            {
                arrays.push(element);
            }
        });
        return arrays;
    }

    // returns an array of all the declared variables
    public getVariables(): Array<string> {
        let variables: Array<string> = new Array();
        this.variables.forEach(element => {
            if(element[1] == 0)
            {
                variables.push(element[0]);
            }
        });
        return variables;
    }

    // true if line is empty
    private isBlank(str: string) {
        return (!str || /^\s*$/.test(str));
    }
    
    // if the line contains variable declarations
    private isDeclaration(str: string): [string, number]
    {
        let size: number = -1, name: string = " ";
        // for each possible variable type
        this.C_TYPES.forEach(type => {
            // if is a variable declaration and not a function declaration
            if(str.includes(type+" ") && !str.includes('('))
            {
                // where the name and array size(optional) begin
                let nStart: number;
                nStart = str.indexOf(type+" ")+type.length + 1;

                // if it is an array
                if(str.includes('[') && str.includes(']'))
                {
                    let start, end: number;
                    start = str.indexOf('[');
                    end = str.indexOf(']');
                    name = str.substr(nStart, start-nStart);
                    size = 0;
                    for(var i = start+1; i < end; ++i)
                    {
                        size *= 10;
                        size += parseInt(str.charAt(i));
                    }
                }
                //if it is a simple variable
                else
                {
                    size = 0;
                    name = str.substr(nStart, str.length-nStart-2);
                }
            }
        });
        return [name, size];
    }

    private tupleArray<T extends any[]>(...v: T) {
        return v;
    }
}