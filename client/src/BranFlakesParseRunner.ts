import { CharStreams, CommonTokenStream, RecognitionException } from 'antlr4ts';
import { DiagnosticSeverity } from 'vscode-languageserver-types';
import { bfLexer } from './generated/bfLexer';
import { bfParser } from './generated/bfParser';


export interface TranslationError {
    line: number;
    charPositionInLine: number;
    msg: string;
    source?: any;
    type: DiagnosticSeverity;
    error?: RecognitionException;
}

export function getTree(str: string, fn: string) {
	const charStreams = CharStreams.fromString(str, fn);
	const lexer = new bfLexer(charStreams);
	const issues: TranslationError[] = [];
	// remove the error listener. We want to put our own
	
	lexer.removeErrorListeners();
	lexer.addErrorListener({
		syntaxError(source, o, line, charPositionInLine, msg, error) {
			issues.push({
				line,
				charPositionInLine,
				msg,
				type: DiagnosticSeverity.Error,
				source,
				error,
			});
		},
	});

	const tokenStreams = new CommonTokenStream(lexer);
	const parser = new bfParser(tokenStreams);

	// remove the error listener. We want to put our own
	parser.removeErrorListeners();
	parser.addErrorListener({
		syntaxError(source, o, line, charPositionInLine, msg, error) {
			issues.push({
				line,
				charPositionInLine,
				msg,
				type: DiagnosticSeverity.Error,
				source,
				error,
			});
		},
	});
	const tree = parser.program();

	return { tree, issues, tokenStreams, charStreams };
}
