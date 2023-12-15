import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { LoopStmtContext } from './generated/bfParser';
import { bfVisitor } from './generated/bfVisitor';
import { DiagnosticSeverity } from 'vscode-languageclient';
import { getTree } from './BranFlakesParseRunner';

export default class BranFlakesExecutorVisitor
	extends AbstractParseTreeVisitor<void>
	implements bfVisitor<void> {

	/**
	 *
	 * @param input Input string
	 * @param inputPtr Input pointer to start from
	 */
	constructor(protected input: string = '', protected inputPtr: number = 0) {
		super();
	}
	/**
	 * The memory cells (Can work with negative cells this way)
	 */
	protected cells: Map<number, number> = new Map();
	protected byteArray: Int8Array = new Int8Array(30000);
	/**
	 * Pointer
	 */
	protected ptr: number = 0;
	/** Output string */
	protected outputStrArray: string[] = [];

	/**
	 * Output string (Available only after visiting)
	 */
	public get outputStr() {
		return this.outputStrArray.join('');
	}


	defaultResult() { }
	/**
	 * Run a file
	 * @param text 
	 * @param fn 
	 * @param input 
	 * @returns 
	 */
	static run(text:string,fn: string, input:string){
		//get tree and issues
		const { tree, issues } = getTree(text, fn);

		//get only errors
		const x = issues.filter(e => e.type === DiagnosticSeverity.Error);
		//if any error, drop
		if (x.length > 0) {
			throw Error('Errors exist');
		}
		// make visitor
		const vis = new BranFlakesExecutorVisitor(input);
	
		//visit the tree
		vis.visit(tree);
	
		//get output
		return vis.outputStr;
	}
	

	visitLoopStmt(ctx: LoopStmtContext) {
		while ((this.cells.get(this.ptr) ?? 0) !== 0) {
			this.visitChildren(ctx);
		}
	}
	visitPtrLeft() {

		--this.ptr;
	}
	visitPtrRight() {
		++this.ptr;
	}
	visitPtrIncr() {

		const val = this.cells.get(this.ptr);
		if (val === undefined) {
			this.cells.set(this.ptr, 1);
		} else if (val === 255) {
			this.cells.delete(this.ptr);
		} else {
			this.cells.set(this.ptr, val + 1);
		}
	}
	visitPtrDecr() {
		// console.log('down',this.ptr,this.cells);
		const val = this.cells.get(this.ptr);
		if (val === undefined || val === 0) {
			this.cells.set(this.ptr, 255);
		} else if (val === 1) {
			this.cells.delete(this.ptr);
		} else {
			this.cells.set(this.ptr, val - 1);
		}
	}
	visitOutputStmt() {
		const val = this.cells.get(this.ptr) ?? 0;
		const str = String.fromCharCode(val);
		// console.log('op',str);
		this.outputStrArray.push(str);
	}

	visitInputStmt() {
		//get char
		const char = this.input.charCodeAt(this.inputPtr) ?? 0;
		//increment the input pointer after this
		this.inputPtr++;
		this.cells.set(this.ptr, char);
	}
}
