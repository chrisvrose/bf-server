// Generated from bf.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { bfVisitor } from "./bfVisitor";


export class bfParser extends Parser {
	public static readonly LOOPSTART = 1;
	public static readonly LOOPEND = 2;
	public static readonly NUMBER = 3;
	public static readonly INPUT = 4;
	public static readonly OUTPUT = 5;
	public static readonly DEC = 6;
	public static readonly INC = 7;
	public static readonly LEFT = 8;
	public static readonly RIGHT = 9;
	public static readonly EVERYTHING_ELSE = 10;
	public static readonly WS = 11;
	public static readonly RULE_program = 0;
	public static readonly RULE_statements = 1;
	public static readonly RULE_eligibleStmt = 2;
	public static readonly RULE_numberedStmt = 3;
	public static readonly RULE_stmt = 4;
	public static readonly RULE_loopStmt = 5;
	public static readonly RULE_basicStmt = 6;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "statements", "eligibleStmt", "numberedStmt", "stmt", "loopStmt", 
		"basicStmt",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'['", "']'", undefined, "','", "'.'", "'-'", "'+'", "'<'", 
		"'>'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "LOOPSTART", "LOOPEND", "NUMBER", "INPUT", "OUTPUT", "DEC", 
		"INC", "LEFT", "RIGHT", "EVERYTHING_ELSE", "WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(bfParser._LITERAL_NAMES, bfParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return bfParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "bf.g4"; }

	// @Override
	public get ruleNames(): string[] { return bfParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return bfParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(bfParser._ATN, this);
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let _localctx: ProgramContext = new ProgramContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, bfParser.RULE_program);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 14;
			this.statements();
			this.state = 15;
			this.match(bfParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statements(): StatementsContext {
		let _localctx: StatementsContext = new StatementsContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, bfParser.RULE_statements);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 20;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << bfParser.LOOPSTART) | (1 << bfParser.INPUT) | (1 << bfParser.OUTPUT) | (1 << bfParser.DEC) | (1 << bfParser.INC) | (1 << bfParser.LEFT) | (1 << bfParser.RIGHT))) !== 0)) {
				{
				{
				this.state = 17;
				this.eligibleStmt();
				}
				}
				this.state = 22;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public eligibleStmt(): EligibleStmtContext {
		let _localctx: EligibleStmtContext = new EligibleStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, bfParser.RULE_eligibleStmt);
		try {
			this.state = 25;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 23;
				this.stmt();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 24;
				this.numberedStmt();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public numberedStmt(): NumberedStmtContext {
		let _localctx: NumberedStmtContext = new NumberedStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, bfParser.RULE_numberedStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 27;
			this.stmt();
			this.state = 28;
			this.match(bfParser.NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stmt(): StmtContext {
		let _localctx: StmtContext = new StmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, bfParser.RULE_stmt);
		try {
			this.state = 32;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case bfParser.INPUT:
			case bfParser.OUTPUT:
			case bfParser.DEC:
			case bfParser.INC:
			case bfParser.LEFT:
			case bfParser.RIGHT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 30;
				this.basicStmt();
				}
				break;
			case bfParser.LOOPSTART:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 31;
				this.loopStmt();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public loopStmt(): LoopStmtContext {
		let _localctx: LoopStmtContext = new LoopStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, bfParser.RULE_loopStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 34;
			this.match(bfParser.LOOPSTART);
			this.state = 35;
			this.statements();
			this.state = 36;
			this.match(bfParser.LOOPEND);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public basicStmt(): BasicStmtContext {
		let _localctx: BasicStmtContext = new BasicStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, bfParser.RULE_basicStmt);
		try {
			this.state = 44;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case bfParser.INC:
				_localctx = new PtrIncrContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 38;
				this.match(bfParser.INC);
				}
				break;
			case bfParser.DEC:
				_localctx = new PtrDecrContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 39;
				this.match(bfParser.DEC);
				}
				break;
			case bfParser.LEFT:
				_localctx = new PtrLeftContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 40;
				this.match(bfParser.LEFT);
				}
				break;
			case bfParser.RIGHT:
				_localctx = new PtrRightContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 41;
				this.match(bfParser.RIGHT);
				}
				break;
			case bfParser.INPUT:
				_localctx = new InputStmtContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 42;
				this.match(bfParser.INPUT);
				}
				break;
			case bfParser.OUTPUT:
				_localctx = new OutputStmtContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 43;
				this.match(bfParser.OUTPUT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\r1\x04\x02\t" +
		"\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07\t" +
		"\x07\x04\b\t\b\x03\x02\x03\x02\x03\x02\x03\x03\x07\x03\x15\n\x03\f\x03" +
		"\x0E\x03\x18\v\x03\x03\x04\x03\x04\x05\x04\x1C\n\x04\x03\x05\x03\x05\x03" +
		"\x05\x03\x06\x03\x06\x05\x06#\n\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03" +
		"\b\x03\b\x03\b\x03\b\x03\b\x03\b\x05\b/\n\b\x03\b\x02\x02\x02\t\x02\x02" +
		"\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x02\x02\x021\x02\x10\x03\x02" +
		"\x02\x02\x04\x16\x03\x02\x02\x02\x06\x1B\x03\x02\x02\x02\b\x1D\x03\x02" +
		"\x02\x02\n\"\x03\x02\x02\x02\f$\x03\x02\x02\x02\x0E.\x03\x02\x02\x02\x10" +
		"\x11\x05\x04\x03\x02\x11\x12\x07\x02\x02\x03\x12\x03\x03\x02\x02\x02\x13" +
		"\x15\x05\x06\x04\x02\x14\x13\x03\x02\x02\x02\x15\x18\x03\x02\x02\x02\x16" +
		"\x14\x03\x02\x02\x02\x16\x17\x03\x02\x02\x02\x17\x05\x03\x02\x02\x02\x18" +
		"\x16\x03\x02\x02\x02\x19\x1C\x05\n\x06\x02\x1A\x1C\x05\b\x05\x02\x1B\x19" +
		"\x03\x02\x02\x02\x1B\x1A\x03\x02\x02\x02\x1C\x07\x03\x02\x02\x02\x1D\x1E" +
		"\x05\n\x06\x02\x1E\x1F\x07\x05\x02\x02\x1F\t\x03\x02\x02\x02 #\x05\x0E" +
		"\b\x02!#\x05\f\x07\x02\" \x03\x02\x02\x02\"!\x03\x02\x02\x02#\v\x03\x02" +
		"\x02\x02$%\x07\x03\x02\x02%&\x05\x04\x03\x02&\'\x07\x04\x02\x02\'\r\x03" +
		"\x02\x02\x02(/\x07\t\x02\x02)/\x07\b\x02\x02*/\x07\n\x02\x02+/\x07\v\x02" +
		"\x02,/\x07\x06\x02\x02-/\x07\x07\x02\x02.(\x03\x02\x02\x02.)\x03\x02\x02" +
		"\x02.*\x03\x02\x02\x02.+\x03\x02\x02\x02.,\x03\x02\x02\x02.-\x03\x02\x02" +
		"\x02/\x0F\x03\x02\x02\x02\x06\x16\x1B\".";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!bfParser.__ATN) {
			bfParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(bfParser._serializedATN));
		}

		return bfParser.__ATN;
	}

}

export class ProgramContext extends ParserRuleContext {
	public statements(): StatementsContext {
		return this.getRuleContext(0, StatementsContext);
	}
	public EOF(): TerminalNode { return this.getToken(bfParser.EOF, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return bfParser.RULE_program; }
	// @Override
	public accept<Result>(visitor: bfVisitor<Result>): Result {
		if (visitor.visitProgram) {
			return visitor.visitProgram(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementsContext extends ParserRuleContext {
	public eligibleStmt(): EligibleStmtContext[];
	public eligibleStmt(i: number): EligibleStmtContext;
	public eligibleStmt(i?: number): EligibleStmtContext | EligibleStmtContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EligibleStmtContext);
		} else {
			return this.getRuleContext(i, EligibleStmtContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return bfParser.RULE_statements; }
	// @Override
	public accept<Result>(visitor: bfVisitor<Result>): Result {
		if (visitor.visitStatements) {
			return visitor.visitStatements(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EligibleStmtContext extends ParserRuleContext {
	public stmt(): StmtContext | undefined {
		return this.tryGetRuleContext(0, StmtContext);
	}
	public numberedStmt(): NumberedStmtContext | undefined {
		return this.tryGetRuleContext(0, NumberedStmtContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return bfParser.RULE_eligibleStmt; }
	// @Override
	public accept<Result>(visitor: bfVisitor<Result>): Result {
		if (visitor.visitEligibleStmt) {
			return visitor.visitEligibleStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NumberedStmtContext extends ParserRuleContext {
	public stmt(): StmtContext {
		return this.getRuleContext(0, StmtContext);
	}
	public NUMBER(): TerminalNode { return this.getToken(bfParser.NUMBER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return bfParser.RULE_numberedStmt; }
	// @Override
	public accept<Result>(visitor: bfVisitor<Result>): Result {
		if (visitor.visitNumberedStmt) {
			return visitor.visitNumberedStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StmtContext extends ParserRuleContext {
	public basicStmt(): BasicStmtContext | undefined {
		return this.tryGetRuleContext(0, BasicStmtContext);
	}
	public loopStmt(): LoopStmtContext | undefined {
		return this.tryGetRuleContext(0, LoopStmtContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return bfParser.RULE_stmt; }
	// @Override
	public accept<Result>(visitor: bfVisitor<Result>): Result {
		if (visitor.visitStmt) {
			return visitor.visitStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LoopStmtContext extends ParserRuleContext {
	public LOOPSTART(): TerminalNode { return this.getToken(bfParser.LOOPSTART, 0); }
	public statements(): StatementsContext {
		return this.getRuleContext(0, StatementsContext);
	}
	public LOOPEND(): TerminalNode { return this.getToken(bfParser.LOOPEND, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return bfParser.RULE_loopStmt; }
	// @Override
	public accept<Result>(visitor: bfVisitor<Result>): Result {
		if (visitor.visitLoopStmt) {
			return visitor.visitLoopStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BasicStmtContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return bfParser.RULE_basicStmt; }
	public copyFrom(ctx: BasicStmtContext): void {
		super.copyFrom(ctx);
	}
}
export class PtrIncrContext extends BasicStmtContext {
	public INC(): TerminalNode { return this.getToken(bfParser.INC, 0); }
	constructor(ctx: BasicStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: bfVisitor<Result>): Result {
		if (visitor.visitPtrIncr) {
			return visitor.visitPtrIncr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PtrDecrContext extends BasicStmtContext {
	public DEC(): TerminalNode { return this.getToken(bfParser.DEC, 0); }
	constructor(ctx: BasicStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: bfVisitor<Result>): Result {
		if (visitor.visitPtrDecr) {
			return visitor.visitPtrDecr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PtrLeftContext extends BasicStmtContext {
	public LEFT(): TerminalNode { return this.getToken(bfParser.LEFT, 0); }
	constructor(ctx: BasicStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: bfVisitor<Result>): Result {
		if (visitor.visitPtrLeft) {
			return visitor.visitPtrLeft(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PtrRightContext extends BasicStmtContext {
	public RIGHT(): TerminalNode { return this.getToken(bfParser.RIGHT, 0); }
	constructor(ctx: BasicStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: bfVisitor<Result>): Result {
		if (visitor.visitPtrRight) {
			return visitor.visitPtrRight(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InputStmtContext extends BasicStmtContext {
	public INPUT(): TerminalNode { return this.getToken(bfParser.INPUT, 0); }
	constructor(ctx: BasicStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: bfVisitor<Result>): Result {
		if (visitor.visitInputStmt) {
			return visitor.visitInputStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class OutputStmtContext extends BasicStmtContext {
	public OUTPUT(): TerminalNode { return this.getToken(bfParser.OUTPUT, 0); }
	constructor(ctx: BasicStmtContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public accept<Result>(visitor: bfVisitor<Result>): Result {
		if (visitor.visitOutputStmt) {
			return visitor.visitOutputStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


