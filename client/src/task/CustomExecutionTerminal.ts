import * as vscode from 'vscode';


interface BFRunTaskDefinition extends vscode.TaskDefinition {
	file?: string;
}

export class CustomExecutionTaskProvider implements vscode.TaskProvider {
	static type: string = 'bf-run';
	tasks: vscode.Task[] | undefined;

	constructor(private workspaceRoot: string|undefined){

	}

	provideTasks(token?: vscode.CancellationToken): vscode.ProviderResult<vscode.Task[]> {
		if (this.tasks !== undefined) { return this.tasks; }
		
		this.tasks = [this.getTaskFromDefinition(undefined)];
		return this.tasks;
	}


	getTaskFromDefinition(fileName: string|undefined): vscode.Task {
		const definition:BFRunTaskDefinition = {
			type: CustomExecutionTaskProvider.type,
			file: fileName
		};
		return new vscode.Task(definition, vscode.TaskScope.Workspace,`bf: run: current file`,CustomExecutionTaskProvider.type,
			new vscode.CustomExecution(async ()=>{
				return new CustomBuildTaskTerminal(definition.file);
			})
		);
	}

	resolveTask(_task: vscode.Task, token?: vscode.CancellationToken): vscode.ProviderResult<vscode.Task> {
		const definition:BFRunTaskDefinition = <any>_task.definition;
		
		const fileNameRecovered = definition.file;
		const taskName = `bf: run: `+ ( fileNameRecovered??'current file');
		return new vscode.Task(definition,vscode.TaskScope.Workspace, taskName, CustomExecutionTaskProvider.type,
			new vscode.CustomExecution(async ()=>{
				return new CustomBuildTaskTerminal(definition.file);
			})
		);
	}

}


class CustomBuildTaskTerminal implements vscode.Pseudoterminal {
	private writeEmitter = new vscode.EventEmitter<string>();
	private closeEmitter = new vscode.EventEmitter<number>();

	
	private openDocument:vscode.TextDocument|undefined;
	onDidWrite: vscode.Event<string> = this.writeEmitter.event;
	onDidClose?: vscode.Event<number> = this.closeEmitter.event;

	handleInput(data: string): void {
		this.writeEmitter.fire(`Echo`+data);
	}


	constructor(private fileName?:string) {
	}

	open(initialDimensions: vscode.TerminalDimensions | undefined): void {
		// At this point we can start using the terminal.
		
		const openDocument = vscode.window.activeTextEditor.document;
		this.openDocument = openDocument;
		console.log(openDocument.languageId);
		this.doExecution();
	}

	close(): void {
		// The terminal has been closed. Shutdown the build.
	}

	private async doExecution(): Promise<void> {
		this.writeEmitter.fire('Build complete.\r\n\r\n');
		this.writeEmitter.fire('Requested build of '+this.fileName);
		this.writeEmitter.fire(this.openDocument.getText());
		this.closeEmitter.fire(0);
	}
}