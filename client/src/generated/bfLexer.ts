// Generated from bf.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { NotNull } from "antlr4ts/Decorators";
import { Override } from "antlr4ts/Decorators";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class bfLexer extends Lexer {
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

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"LOOPSTART", "LOOPEND", "NUMBER", "INPUT", "OUTPUT", "DEC", "INC", "LEFT", 
		"RIGHT", "EVERYTHING_ELSE", "WS",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'['", "']'", undefined, "','", "'.'", "'-'", "'+'", "'<'", 
		"'>'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "LOOPSTART", "LOOPEND", "NUMBER", "INPUT", "OUTPUT", "DEC", 
		"INC", "LEFT", "RIGHT", "EVERYTHING_ELSE", "WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(bfLexer._LITERAL_NAMES, bfLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return bfLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(bfLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "bf.g4"; }

	// @Override
	public get ruleNames(): string[] { return bfLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return bfLexer._serializedATN; }

	// @Override
	public get channelNames(): string[] { return bfLexer.channelNames; }

	// @Override
	public get modeNames(): string[] { return bfLexer.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\r6\b\x01\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x03\x02\x03" +
		"\x02\x03\x03\x03\x03\x03\x04\x06\x04\x1F\n\x04\r\x04\x0E\x04 \x03\x05" +
		"\x03\x05\x03\x06\x03\x06\x03\x07\x03\x07\x03\b\x03\b\x03\t\x03\t\x03\n" +
		"\x03\n\x03\v\x03\v\x03\v\x03\v\x03\f\x03\f\x03\f\x03\f\x02\x02\x02\r\x03" +
		"\x02\x03\x05\x02\x04\x07\x02\x05\t\x02\x06\v\x02\x07\r\x02\b\x0F\x02\t" +
		"\x11\x02\n\x13\x02\v\x15\x02\f\x17\x02\r\x03\x02\x04\x03\x022;\x05\x02" +
		"\f\f\x0F\x0F\"\"\x026\x02\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02" +
		"\x02\x07\x03\x02\x02\x02\x02\t\x03\x02\x02\x02\x02\v\x03\x02\x02\x02\x02" +
		"\r\x03\x02\x02\x02\x02\x0F\x03\x02\x02\x02\x02\x11\x03\x02\x02\x02\x02" +
		"\x13\x03\x02\x02\x02\x02\x15\x03\x02\x02\x02\x02\x17\x03\x02\x02\x02\x03" +
		"\x19\x03\x02\x02\x02\x05\x1B\x03\x02\x02\x02\x07\x1E\x03\x02\x02\x02\t" +
		"\"\x03\x02\x02\x02\v$\x03\x02\x02\x02\r&\x03\x02\x02\x02\x0F(\x03\x02" +
		"\x02\x02\x11*\x03\x02\x02\x02\x13,\x03\x02\x02\x02\x15.\x03\x02\x02\x02" +
		"\x172\x03\x02\x02\x02\x19\x1A\x07]\x02\x02\x1A\x04\x03\x02\x02\x02\x1B" +
		"\x1C\x07_\x02\x02\x1C\x06\x03\x02\x02\x02\x1D\x1F\t\x02\x02\x02\x1E\x1D" +
		"\x03\x02\x02\x02\x1F \x03\x02\x02\x02 \x1E\x03\x02\x02\x02 !\x03\x02\x02" +
		"\x02!\b\x03\x02\x02\x02\"#\x07.\x02\x02#\n\x03\x02\x02\x02$%\x070\x02" +
		"\x02%\f\x03\x02\x02\x02&\'\x07/\x02\x02\'\x0E\x03\x02\x02\x02()\x07-\x02" +
		"\x02)\x10\x03\x02\x02\x02*+\x07>\x02\x02+\x12\x03\x02\x02\x02,-\x07@\x02" +
		"\x02-\x14\x03\x02\x02\x02./\v\x02\x02\x02/0\x03\x02\x02\x0201\b\v\x02" +
		"\x021\x16\x03\x02\x02\x0223\t\x03\x02\x0234\x03\x02\x02\x0245\b\f\x03" +
		"\x025\x18\x03\x02\x02\x02\x04\x02 \x04\x02\x03\x02\b\x02\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!bfLexer.__ATN) {
			bfLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(bfLexer._serializedATN));
		}

		return bfLexer.__ATN;
	}

}

