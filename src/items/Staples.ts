import { AbstractItem } from "../item/AbstractItem";
import { typeMsg } from "../util/GameHandler";

export default class Staples extends AbstractItem {
	protected viewed = false;

	public id = "staples";
	public name = "Package of Staples";
	public alias = [
		"staples",
		"staple",
		"staple package",
		"staples package"
	];
	public desc = `It seems to be a generic brand-name box of staples.
The box is mildly damp, with only a few staples remaining.`;
	onUse() {
		if (!this.viewed && (this.viewed = true)) typeMsg(`You take out a staple from your box of staples, and inspect it closely.
The staple doesn't look too special. It's thin, sharp, and made of metal. Perhaps you could use this later on.
For now, you decide to put the staple back.`);
		else typeMsg("There are many staples in the staple box. They do not seem to be useful currently.");
	}
}