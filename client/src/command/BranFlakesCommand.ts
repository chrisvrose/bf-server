export interface BranFlakesCommand {
    getCommandName(): string;
    getCommandHandler(): (...args: any) => Promise<any>;
}
