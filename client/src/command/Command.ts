
export interface Command{
	getCommandName():string;
	getCommandHandler():(...args:any)=>Promise<any>;
}