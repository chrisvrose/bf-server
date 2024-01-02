import { window } from 'vscode';
import type { BranFlakesCommand } from './BranFlakesCommand';
import { VSCodePromptInputStrategy } from '../input/VSCodePromptInputStrategy';

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
            const { BranFlakesExecutorVisitor } = await import(
                '../BranFlakesExecutorVisitor'
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
