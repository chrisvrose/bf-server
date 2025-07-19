import { CompletionItem, CompletionItemKind, Connection, DidChangeConfigurationNotification, DidChangeConfigurationParams, InitializeParams, InitializeResult, TextDocumentPositionParams, TextDocuments, TextDocumentSyncKind } from 'vscode-languageserver';
import { validateTextDocument } from './validation';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { BranFlakesSettings, defaultSettings, SettingsManager } from './settings';

export class BranFlakesConnectionManager {
	

	constructor(protected connection: Connection, private validator:typeof validateTextDocument, private documents:TextDocuments<TextDocument>, private settingsManager:SettingsManager) {
		connection.onInitialize(this.initConnection.bind(this));
		connection.onDidChangeConfiguration(this.onDidChangeConfiguration.bind(this));
	}



	initConnection(params: InitializeParams) {
		let capabilities = params.capabilities;

		// Does the client support the `workspace/configuration` request?
		// If not, we will fall back using global settings
		this.settingsManager.hasConfigurationCapability = !!(
			capabilities.workspace && !!capabilities.workspace.configuration
		);
		this.settingsManager.hasWorkspaceFolderCapability = !!(
			capabilities.workspace && !!capabilities.workspace.workspaceFolders
		);
		this.settingsManager.hasDiagnosticRelatedInformationCapability = !!(
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
		if (this.settingsManager.hasWorkspaceFolderCapability) {
			result.capabilities.workspace = {
				workspaceFolders: {
					supported: true,
				},
			};
		}
		return result;
	}

	onDidChangeConfiguration(change:DidChangeConfigurationParams){
		if (this.settingsManager.hasConfigurationCapability) {
			// Reset all cached document settings
			this.settingsManager.clearDocumentSettings();
		} else {
			this.settingsManager.updateSettings(
				(change.settings.languageServerExample || defaultSettings)
			);
		}
		
		// Revalidate all open text documents
		Promise.all(this.documents.all().map(validateTextDocument)).catch(e => {
			this.connection.console.log('Failed to validate text documents');
		});
	}
	onInit() {
		if (this.settingsManager.hasConfigurationCapability) {
			// Register for all configuration changes.
			this.connection.client.register(
				DidChangeConfigurationNotification.type,
				undefined
			);
		}
		if (this.settingsManager.hasWorkspaceFolderCapability) {
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