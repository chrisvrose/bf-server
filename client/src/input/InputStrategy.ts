
export default interface InputStrategy {
	getInput(): Promise<number>;
};