import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { LoopStmtContext } from './generated/bfParser';
import { bfVisitor } from './generated/bfVisitor';
import { DiagnosticSeverity } from 'vscode-languageclient';
import { getTree } from './BranFlakesParseRunner';
import { RuleNode } from 'antlr4ts/tree/RuleNode';
import InputStrategy from './input/InputStrategy';

export default class BranFlakesExecutorVisitor
    extends AbstractParseTreeVisitor<Promise<void>>
    implements bfVisitor<Promise<void>>
{
    /**
     *
     * @param input Input string
     * @param inputPtr Input pointer to start from
     */
    constructor(
        protected inputStrategy: InputStrategy,
        protected logger: (val: string) => Thenable<string>,
        protected inputPtr: number = 0
    ) {
        super();
    }
    // /**
    //  * The memory cells (Can work with negative cells this way)
    //  */
    // protected cells: Map<number, number> = new Map();

    protected byteArraySize: number = 30000;
    protected byteArray: Int8Array = new Int8Array(this.byteArraySize);
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
        logger: (str:string) => Thenable<string>
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
        const vis = new BranFlakesExecutorVisitor(inputStrategy, logger);
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
        --this.ptr;
    }
    async visitPtrRight() {
        ++this.ptr;
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

        this.outputStrArray.push(str);
    }

    async visitInputStmt() {
        //get char
        const char = await this.inputStrategy.getInput() ?? 0;
        //increment the input pointer after this
        this.inputPtr++;
        this.setCell(this.ptr, char);
    }

    // override for maintaining async
    async visitChildren(node: RuleNode): Promise<void> {
        // await this.logger("checking "+node.constructor.name)
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
        return Promise.resolve();
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
