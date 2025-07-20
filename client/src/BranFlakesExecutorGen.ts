import { EventEmitter } from 'vscode';
import InputStrategy from './input/InputStrategy';
import {BranFlakesExecutorVisitor} from './exec/BranFlakesExecutorVisitor';

export class BranFlakesStreamingExecutor {

	constructor(private fileData: string, private fileName: string = 'fileName:dummy', private emitter: EventEmitter<string>,
        private inputStrategy: InputStrategy
	) { }


	async run() {
		const finalOutput = await BranFlakesExecutorVisitor.run(
			this.fileData,
			this.fileName,
			this.inputStrategy,
			async (str) => { this.emitter.fire(str); }
		);
	}
}