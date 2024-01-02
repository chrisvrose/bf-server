import { window } from 'vscode';
import { Command as BranFlakesCommand } from './Command';
import { VSCodePromptInputStrategy } from '../input/VSCodePromptInputStrategy';
import BranFlakesExecutorVisitor from '../BranFlakesExecutorVisitor';

export class CompileBranFlakesCommand implements BranFlakesCommand {
    getCommandName() {
        return 'bf.execute';
    }
    getCommandHandler() {
        return async () => {
            const text = window.activeTextEditor.document.getText();
            const fn = window.activeTextEditor.document.fileName;
            const inputStrategy = new VSCodePromptInputStrategy(
                window.showInputBox
            );
            const output = await BranFlakesExecutorVisitor.run(
                text,
                fn,
                inputStrategy,
                window.showInformationMessage
            );
            await window.showInformationMessage(`Output: ${output}`);
        };
    }
}
