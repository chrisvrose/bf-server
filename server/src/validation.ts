import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { getDocumentSettings, connection } from './server';



export const validateBrackets = (text: string) => {
	let count = 0, lp: number[] = [], issues: number[] = [];
	const textsplit = text.split('');
	textsplit.forEach((x, i) => {
		if (x === '[' || x === ']') {
			if (x === '[') {
				lp.push(i);
			}
			if (x === ']') {
				if (lp.length === 0) {
					issues.push(i);
				}
				lp.pop();
			}
		}
	});

	return [...lp, ...issues];
};



export async function validateTextDocument(textDocument: TextDocument): Promise<void> {
	// In this simple example we get the settings for every validate run.
	let settings = await getDocumentSettings(textDocument.uri);
	// The validator creates diagnostics for all uppercase words length 2 and more
	const text = textDocument.getText();

	let problems = 0;
	let diagnostics: Diagnostic[] = [];
	const issues = validateBrackets(text);

	diagnostics.push(
		...issues.map<Diagnostic>(e => ({
			message: 'Brackets unmatched',
			range: {
				start: textDocument.positionAt(e),
				end: textDocument.positionAt(e + 1),
			},
			severity: DiagnosticSeverity.Error,
			code: '[ and ]',
		}))
	);

	// Send the computed diagnostics to VSCode.
	connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

