/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path';
import { commands, tasks, workspace,window } from 'vscode';
import type { Disposable, ExtensionContext } from 'vscode';
import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind,
} from 'vscode-languageclient';
import { CompileBranFlakesCommand } from './command/CompileBranFlakesCommand';
import { CustomExecutionTaskProvider } from './task/CustomExecutionTerminal';

let client: LanguageClient;

let bfRunTaskProvider: Disposable;

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
			options: debugOptions,
		},
	};

	// Options to control the language client
	let clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'bf' }],
	};

	const branFlakesCommands = [new CompileBranFlakesCommand()];
	for (let branFlakesCommand of branFlakesCommands) {
		context.subscriptions.push(
			commands.registerCommand(
				branFlakesCommand.getCommandName(),
				branFlakesCommand.getCommandHandler()
			),


		);
	}


	// Create the language client and start the client.
	client = new LanguageClient(
		'brainfucklanguageserver',
		'Brainfuck Language Server',
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();

	const workspaceRoot = (workspace.workspaceFolders && (workspace.workspaceFolders.length > 0))
		? workspace.workspaceFolders[0].uri.fsPath : undefined;
	
	bfRunTaskProvider = tasks.registerTaskProvider(CustomExecutionTaskProvider.type, new CustomExecutionTaskProvider(workspaceRoot));
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	bfRunTaskProvider?.dispose();
	client?.stop();
}
