import path = require('node:path');
import * as vscode from 'vscode';


interface BFRunTaskDefinition {
	type: 'current';
	file?: string;
}

export class CustomExecutionTaskProvider implements vscode.TaskProvider {
	static type: string = 'BFExec';
	tasks: vscode.Task[] | undefined;

	constructor(private workspaceRoot: string|undefined,private currentDocument:string |undefined){

	}

	provideTasks(token?: vscode.CancellationToken): vscode.ProviderResult<vscode.Task[]> {
		if (this.tasks !== undefined) { return this.tasks; }
		
		const types: BFRunTaskDefinition['type'][] = ['current'];
		this.tasks = [];
		types.forEach(e=>
			this.tasks.push(this.getTaskFromDefinition(e))
		);


	}
	getTaskFromDefinition(e: string): vscode.Task {
		const definition:BFRunTaskDefinition = {
			type: 'current',
			file: undefined
		};
		return new vscode.Task(definition, vscode.TaskScope.Workspace,`bf: run: current file`,CustomExecutionTaskProvider.type,
			new vscode.CustomExecution(async ()=>{
				return new CustomBuildTaskTerminal(this.workspaceRoot);
			})
		);
	}

	resolveTask(_task: vscode.Task, token?: vscode.CancellationToken): vscode.ProviderResult<vscode.Task> {
		return undefined;
	}

}


class CustomBuildTaskTerminal implements vscode.Pseudoterminal {
	private writeEmitter = new vscode.EventEmitter<string>();
	private closeEmitter = new vscode.EventEmitter<number>();

	
	
	onDidWrite: vscode.Event<string> = this.writeEmitter.event;
	onDidClose?: vscode.Event<number> = this.closeEmitter.event;

	private fileWatcher: vscode.FileSystemWatcher | undefined;

	constructor(private workspaceRoot: string) {
	}

	open(initialDimensions: vscode.TerminalDimensions | undefined): void {
		// At this point we can start using the terminal.
		this.doBuild();
	}

	close(): void {
		// The terminal has been closed. Shutdown the build.
		if (this.fileWatcher) {
			this.fileWatcher.dispose();
		}
	}

	private async doBuild(): Promise<void> {
		return new Promise<void>((resolve) => {
			this.writeEmitter.fire('Starting build...\r\n');
			// Since we don't actually build anything in this example set a timeout instead.
			this.writeEmitter.fire('Build complete.\r\n\r\n');
			this.closeEmitter.fire(0);
			resolve();
		});
	}
}