import * as vscode from 'vscode';
import * as path from 'path';
import { BranFlakesExecutorVisitor } from '../exec/BranFlakesExecutorVisitor';
import { AbortClassRequestor } from '../exec/AbortRequestor';

interface BFRunTaskDefinition extends vscode.TaskDefinition {
	file?: string;
}

export class CustomExecutionTaskProvider implements vscode.TaskProvider {
	static type: string = 'bf-run';
	tasks: vscode.Task[] | undefined;

	constructor(private workspaceRoot: string | undefined) {

	}

	provideTasks(token?: vscode.CancellationToken): vscode.ProviderResult<vscode.Task[]> {
		if (this.tasks !== undefined) { return this.tasks; }

		this.tasks = [this.getTaskFromDefinition(undefined)];
		return this.tasks;
	}


	getTaskFromDefinition(fileName: string | undefined): vscode.Task {
		const definition: BFRunTaskDefinition = {
			type: CustomExecutionTaskProvider.type,
			file: fileName
		};
		return new vscode.Task(definition, vscode.TaskScope.Workspace, `bf: run: current file`, CustomExecutionTaskProvider.type,
			new vscode.CustomExecution(async () => {
				return new CustomBuildTaskTerminal(definition.file);
			})
		);
	}

	resolveTask(_task: vscode.Task, token?: vscode.CancellationToken): vscode.ProviderResult<vscode.Task> {
		const definition: BFRunTaskDefinition = <any>_task.definition;

		const fileNameRecovered = definition.file;
		const taskName = `bf: run: ` + (fileNameRecovered ?? 'current file');
		return new vscode.Task(definition, vscode.TaskScope.Workspace, taskName, CustomExecutionTaskProvider.type,
			new vscode.CustomExecution(async () => {
				return new CustomBuildTaskTerminal(definition.file);
			})
		);
	}

}

function replaceLFWithCRLF(data: string) {
	return data.replace(/(?<!\r)\n/gm, '\r\n');
}


class CustomBuildTaskTerminal implements vscode.Pseudoterminal {
	private writeEmitter = new vscode.EventEmitter<string>();
	private closeEmitter = new vscode.EventEmitter<number>();

	private readEmitter = new vscode.EventEmitter<void>();
	inputQueue: number[] = [];

	private openDocument: vscode.TextDocument | undefined;
	onDidWrite: vscode.Event<string> = this.writeEmitter.event;
	onDidClose?: vscode.Event<number> = this.closeEmitter.event;
	abortRequestor = new AbortClassRequestor();

	handleInput(data: string): void {
		// this.writeEmitter.fire(`Echo(${data.length})` + data);
		const newData = [...data].map(e => e.charCodeAt(0));
		console.log('new input', newData);
		this.inputQueue.push(...newData);
		this.writeEmitter.fire(replaceLFWithCRLF(data));
		this.readEmitter.fire();
	}


	constructor(private fileName?: string) {
	}

	open(_initialDimensions: vscode.TerminalDimensions | undefined): void {
		// At this point we can start using the terminal.
		this.openDocumentForTask().then(this.doExecution.bind(this));
	}

	getPath(fileLocationString: string | undefined, fileName: string) {
		if (fileLocationString === undefined) { return vscode.Uri.file(fileName); }
		return vscode.Uri.file(path.resolve(fileLocationString, fileName));
	}

	private async openDocumentForTask() {
		let openDocument: vscode.TextDocument;
		if (this.fileName !== undefined) {
			try {
				const fileLocationPathString = vscode.workspace.workspaceFolders?.[0]?.uri?.fsPath;
				const finalPath = this.getPath(fileLocationPathString, this.fileName);
				openDocument = await vscode.workspace.openTextDocument(finalPath);
			} catch (e) {
				vscode.window.showErrorMessage('Failed to open file ' + this.fileName);
				this.closeEmitter.fire(2);
			}
		} else {
			openDocument = vscode.window.activeTextEditor.document;
		}
		this.openDocument = openDocument;
	}

	close(): void {
		// The terminal has been closed. Shutdown the build.
		console.log('Forced close');
		this.abortRequestor.requestAbort();
	}

	private async doExecution(): Promise<void> {
		this.writeEmitter.fire('[bf] Requested execution of ' + (this.fileName ?? 'active file') + '\r\n');
		const cus = this;
		try {

			await BranFlakesExecutorVisitor.run(this.openDocument.getText(),
				this.openDocument.uri.fsPath,
				{
					getInput() {
						return new Promise((res, rej) => {
							if (cus.inputQueue.length > 0) {
								const char = cus.inputQueue.shift();
								res(char);
							} else {
								const dispose: vscode.Disposable[] = [];
								cus.readEmitter.event(e => {
									const char = cus.inputQueue.shift();
									//clear the earliest disposable
									dispose.shift()?.dispose();
									res(char);
								}, null, dispose);

							}
						});
					},
				},
				async (data) => {
					this.writeEmitter.fire(replaceLFWithCRLF(data));
				},this.abortRequestor
			);
			this.closeEmitter.fire(0);
		} catch (e) {
			this.closeEmitter.fire(1);
		}


	}
}