import { Direction } from "../util/Direction";

export abstract class AbstractArea {
	public abstract id: string;
	public abstract name: string;
	public abstract desc?: string;
	public abstract travel: Partial<Record<Direction, string>>;
	public firstDesc?: string;
	public image?: string;
	public color?: string | number;
	public get showPaths() {
		if (!Object.keys(this.travel).length) return "";
		return  `\n\nYou can move ${Object.keys(this.travel).join(", ")}.`;
	}
	/** Returns true if the other command handlers should handle it, else false */
	public onCommand(command: string, args: string[]): boolean { return true; }
	public movedDir(dir: Direction) {
		return `You have moved ${Direction[dir]}, and arrived at ${this.name}.\n\n`;
	}
	public failedMove(dir: Direction) {
		return `You cannot move ${Direction[dir]} here.`;
	}
	public onGrab(str: string): boolean { str; return false; }
	public failedGrab(str: string) {
		return `As far as you can tell, there isn't a ${str} here.`;
	}
}
