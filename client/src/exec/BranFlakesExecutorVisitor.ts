import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { LoopStmtContext } from '../generated/bfParser';
import { bfVisitor } from '../generated/bfVisitor';
import { DiagnosticSeverity } from 'vscode-languageclient';
import { getTree } from '../BranFlakesParseRunner';
import { RuleNode } from 'antlr4ts/tree/RuleNode';
import type InputStrategy from '../input/InputStrategy';
import { AbortClassRequestor } from './AbortRequestor';

export class BranFlakesExecutorVisitor
	extends AbstractParseTreeVisitor<Promise<void>>
	implements bfVisitor<Promise<void>> {
	/**
	 *
	 * @param input Input string
	 * @param inputPtr Input pointer to start from
	 */
	constructor(
		private inputStrategy: InputStrategy,
		private logger: (val: string) => Thenable<void>,
		private abortRequestor?: AbortClassRequestor,
		private inputPtr: number = 0
	) {
		super();
	}
	// /**
	//  * The memory cells (Can work with negative cells this way)
	//  */
	// private cells: Map<number, number> = new Map();

	private byteArraySize: number = 30000;
	private byteArray: Int8Array = new Int8Array(this.byteArraySize);
	/**
	 * Pointer
	 */
	private ptr: number = 0;
	/** Output string */
	private outputStr: string = '';


	defaultResult() {
		return Promise.resolve();
	}
	/**
	 * Run a file
	 * @param text
	 * @param fn
	 * @param inputStrategy
	 * @returns
	 */
	static async run(
		text: string,
		fn: string,
		inputStrategy: InputStrategy,
		logger: (str: string) => Thenable<void>,
		aborter?: AbortClassRequestor
	) {
		//get tree and issues
		const { tree, issues } = getTree(text, fn);

		//get only errors
		const x = issues.filter(e => e.type === DiagnosticSeverity.Error);
		//if any error, drop
		if (x.length > 0) {
			throw Error('Errors exist');
		}
		// make visitor
		const vis = new BranFlakesExecutorVisitor(inputStrategy, logger, aborter);
		//visit the tree
		await vis.visit(tree);

		//get output
		return vis.outputStr;
	}

	getCell(pointerIndex: number) {
		return this.byteArray[pointerIndex];
	}
	setCell(pointerIndex: number, value: number): void {
		this.byteArray[pointerIndex] = value;
	}

	async visitLoopStmt(ctx: LoopStmtContext) {
		while ((this.getCell(this.ptr) ?? 0) !== 0) {
			await this.visitChildren(ctx);
		}
	}
	async visitPtrLeft() {
		this.ptr = (this.ptr + this.byteArraySize - 1) % this.byteArraySize;
	}
	async visitPtrRight() {
		this.ptr = (this.ptr + this.byteArraySize + 1) % this.byteArraySize;
	}
	async visitPtrIncr() {
		const val = this.getCell(this.ptr);
		this.setCell(this.ptr, (val + 1) % 256);
	}
	async visitPtrDecr() {
		const val = this.getCell(this.ptr);
		this.setCell(this.ptr, (val + 255) % 256);
	}
	async visitOutputStmt() {
		const val = this.getCell(this.ptr) ?? 0;
		const str = String.fromCharCode(val);

		this.outputStr += str;
		await this.logger(str);
	}

	async visitInputStmt() {
		//get char
		const char = (await this.inputStrategy.getInput()) ?? 0;
		if (char === 3) { throw Error('Halt input wait'); }
		//increment the input pointer after this
		this.inputPtr++;
		this.setCell(this.ptr, char);
	}

	// override for maintaining async
	async visitChildren(node: RuleNode): Promise<void> {
		let result = this.defaultResult();
		await result;
		let n = node.childCount;
		for (let i = 0; i < n; i++) {
			if (!this.shouldVisitNextChild(node, result)) {
				break;
			}
			let c = node.getChild(i);
			let childResult = c.accept(this);
			result = this.aggregateResult(result, childResult);
			await result;
		}
		// break for any close requests
		return new Promise((res, rej) => {

			setTimeout(() => { if (this.abortRequestor?.isAborted()??false) {rej('aborted');} else {res(undefined);} }, 0);
		});
	}
	// override for maintaining async
	protected async aggregateResult(
		aggregate: Promise<void>,
		nextResult: Promise<void>
	): Promise<void> {
		await aggregate;
		return nextResult;
	}
}
