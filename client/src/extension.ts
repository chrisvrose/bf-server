/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path';
import { workspace, ExtensionContext,commands, window } from 'vscode';
import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient';
import BranFlakesExecutorVisitor from './BranFlakesExecutorVisitor';


let client: LanguageClient;

export function activate(context: ExtensionContext) {
	// The server is implemented in node
	let serverModule = context.asAbsolutePath(
		path.join('server', 'dist', 'server.js')
	);
	// The debug options for the server
	// --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
	let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	let serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
			options: debugOptions
		}
	};

	// Options to control the language client
	let clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'bf' }]
	};

	const command = 'bf.execute';
	const commandHandler = async()=>{
		const text= window.activeTextEditor.document.getText();
		const fn = window.activeTextEditor.document.fileName;
		const input = await window.showInputBox({prompt:'Enter input (If not enough, program will assume 0)'});
		
		const output = BranFlakesExecutorVisitor.run(text,fn,input);
		
		await window.showInformationMessage(`Output: ${output}`);
	};

	context.subscriptions.push(commands.registerCommand(command,commandHandler));

	// Create the language client and start the client.
	client = new LanguageClient(
		'brainfucklanguageserver',
		'Brainfuck Language Server',
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
