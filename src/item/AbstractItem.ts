import { typeMsg } from "../util/GameHandler";

export abstract class AbstractItem {
	public abstract id: string;
	public abstract name: string;
	public abstract desc: string;
	public firstDesc?: string;
	public image?: string;
	public alias: string[] = [];
	public onUse(command: string, args: string[]) {
		typeMsg(`You are unable to ${command} this ${this.name}.`);
	}
}
