import { CancellationToken, InputBoxOptions } from 'vscode';
import InputStrategy from './InputStrategy';

export class VSCodePromptInputStrategy implements InputStrategy {
    private inputQueue:string;
	constructor(private requestor:(promptOptions?:InputBoxOptions,cancelToken?:CancellationToken)=>Thenable<string>) {}

    async getInput(): Promise<number> {
        while (this.inputQueue.length == 0) {
            await this.requestInputFromPrompt();
        }
        const character = this.inputQueue.charCodeAt(0);
        this.inputQueue = this.inputQueue.substring(1);
        
        return character;
    }
    private async requestInputFromPrompt() {
        const inputPrompt = await this.requestor({prompt:"More input is required. Please provide input:"});
        this.inputQueue += inputPrompt;
    }
}
