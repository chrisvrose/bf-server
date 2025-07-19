import { CompletionItem, CompletionItemKind, Connection, DidChangeConfigurationNotification, DidChangeConfigurationParams, InitializeParams, InitializeResult, TextDocumentPositionParams, TextDocumentSyncKind } from 'vscode-languageserver';

export class BranFlakesConnectionManager {
	hasConfigurationCapability: boolean = false;
	hasWorkspaceFolderCapability: boolean = false;
	hasDiagnosticRelatedInformationCapability: boolean = false;

	constructor(protected connection: Connection) {
		connection.onInitialize(this.initConnection);
	}

	initConnection(params: InitializeParams) {
		let capabilities = params.capabilities;

		// Does the client support the `workspace/configuration` request?
		// If not, we will fall back using global settings
		this.hasConfigurationCapability = !!(
			capabilities.workspace && !!capabilities.workspace.configuration
		);
		this.hasWorkspaceFolderCapability = !!(
			capabilities.workspace && !!capabilities.workspace.workspaceFolders
		);
		this.hasDiagnosticRelatedInformationCapability = !!(
			capabilities.textDocument &&
			capabilities.textDocument.publishDiagnostics &&
			capabilities.textDocument.publishDiagnostics.relatedInformation
		);

		const result: InitializeResult = {
			capabilities: {
				textDocumentSync: TextDocumentSyncKind.Incremental,
				// Tell the client that the server supports code completion
				completionProvider: {
					resolveProvider: false,
					triggerCharacters: ['.'],
				},
			},
		};
		if (this.hasWorkspaceFolderCapability) {
			result.capabilities.workspace = {
				workspaceFolders: {
					supported: true,
				},
			};
		}
		return result;
	}
	onInit() {
		if (this.hasConfigurationCapability) {
			// Register for all configuration changes.
			this.connection.client.register(
				DidChangeConfigurationNotification.type,
				undefined
			);
		}
		if (this.hasWorkspaceFolderCapability) {
			this.connection.workspace.onDidChangeWorkspaceFolders(_event => {
				// connection.console.log('Workspace folder change event received.');
			});
		}
	}

	setOnCompletion() {
		this.connection.onCompletion((_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
			const completions: CompletionItem[] = [
				{
					label: '+',
					detail: 'Addition',
					documentation: 'Add one to cell',
				},
				{
					label: '-',
					detail: 'Subtraction',
					documentation: 'Subtract one from cell',
				},
				{
					label: ',',
					detail: 'Input',
					documentation: 'Ask for input (Stored in the ASCII format)',
				},
				{
					label: '.',
					detail: 'Output',
					documentation: 'Output the equivalent ASCII character',
				},
				{
					label: '>',
					detail: 'Right Shift',
					documentation: 'Shift the pointer one cell to the right',
				},
				{
					label: '<',
					detail: 'Left Shift',
					documentation: 'Shift the pointer one cell to the Left',
				},
			];
			return completions.map(e => {
				e.kind = CompletionItemKind.Operator;
				return e;
			});
		});
	}

	listen() {
		this.connection.listen();
	}

}