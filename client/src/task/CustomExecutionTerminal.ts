import path = require('node:path');
import * as vscode from 'vscode';


export class CustomExecutionTaskProvider implements vscode.TaskProvider{
    
	provideTasks(token?: vscode.CancellationToken): vscode.ProviderResult<vscode.Task[]> {
		throw new Error('Method not implemented.');
	}
	resolveTask(task: vscode.Task, token?: vscode.CancellationToken): vscode.ProviderResult<vscode.Task> {
		const taskDefinition = {};
		throw new Error('5');
		// return new vscode.Task()
	}

}


class CustomBuildTaskTerminal implements vscode.Pseudoterminal {
	private writeEmitter = new vscode.EventEmitter<string>();
	onDidWrite: vscode.Event<string> = this.writeEmitter.event;
	private closeEmitter = new vscode.EventEmitter<number>();
	onDidClose?: vscode.Event<number> = this.closeEmitter.event;

	private fileWatcher: vscode.FileSystemWatcher | undefined;

	constructor(private workspaceRoot: string, private flavor: string, private flags: string[], private getSharedState: () => string | undefined, private setSharedState: (state: string) => void) {
	}

	open(initialDimensions: vscode.TerminalDimensions | undefined): void {
		// At this point we can start using the terminal.
		if (this.flags.indexOf('watch') > -1) {
			const pattern = path.join(this.workspaceRoot, 'customBuildFile');
			this.fileWatcher = vscode.workspace.createFileSystemWatcher(pattern);
			this.fileWatcher.onDidChange(() => this.doBuild());
			this.fileWatcher.onDidCreate(() => this.doBuild());
			this.fileWatcher.onDidDelete(() => this.doBuild());
		}
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
			let isIncremental = this.flags.indexOf('incremental') > -1;
			if (isIncremental) {
				if (this.getSharedState()) {
					this.writeEmitter.fire('Using last build results: ' + this.getSharedState() + '\r\n');
				} else {
					isIncremental = false;
					this.writeEmitter.fire('No result from last build. Doing full build.\r\n');
				}
			}

			// Since we don't actually build anything in this example set a timeout instead.
			setTimeout(() => {
				const date = new Date();
				this.setSharedState(date.toTimeString() + ' ' + date.toDateString());
				this.writeEmitter.fire('Build complete.\r\n\r\n');
				if (this.flags.indexOf('watch') === -1) {
					this.closeEmitter.fire(0);
					resolve();
				}
			}, isIncremental ? 1000 : 4000);
		});
	}
}