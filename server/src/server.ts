/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
	createConnection,
	TextDocuments,
	ProposedFeatures,
} from 'vscode-languageserver';

import { TextDocument } from 'vscode-languageserver-textdocument';
import { BranFlakesSettings, defaultSettings, SettingsManager } from './settings';
import { BranFlakesConnectionManager } from './connection';
import { validateTextDocument } from './validation';

// Create a connection for the server. The connection uses Node's IPC as a transport.
// Also include all preview / proposed LSP features.
export let connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager. The text document manager
// supports full document sync only
let documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);


let globalSettings: BranFlakesSettings = defaultSettings;

// Cache the settings of all open documents
let documentSettings: Map<string, Thenable<BranFlakesSettings>> = new Map();
let settingsManager = new SettingsManager();
let cm = new BranFlakesConnectionManager(connection, validateTextDocument,documents,settingsManager);


export function getDocumentSettings(resource: string): Thenable<BranFlakesSettings> {
	if (!settingsManager.hasConfigurationCapability) {
		return Promise.resolve(globalSettings);
	}
	let result = documentSettings.get(resource);
	if (!result) {
		result = connection.workspace.getConfiguration({
			scopeUri: resource,
			section: 'languageServerExample',
		});
		documentSettings.set(resource, result);
	}
	return result;
}

// Only keep settings for open documents
documents.onDidClose(e => {
	settingsManager.closeDocument(e.document.uri);
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
	validateTextDocument(change.document);
});

//Run when saved
documents.onDidSave(change => {
	validateTextDocument(change.document);
});

// This handler provides the initial list of the completion items.
cm.setOnCompletion();

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
cm.listen();