import CliffArea from "../areas/CliffArea";
import { AbstractItem } from "../item/AbstractItem";
import { typeMsg } from "../util/GameHandler";
import { GameState } from "../util/GameState";

export default class BrokenBranch extends AbstractItem {
	public id = "broken_branch";
	public name = "Broken Branch";
	public alias = [
		"branch",
		"tree branch",
		"broken tree branch"
	];
	public desc = `The branch appears to be a normal tree branch, except with a large crack in the center.
The stick appears to be very long. It would've been very useful, if it had not been broken. The branch is mildly damp.`;

	onUse() {
		if (GameState.getArea() instanceof CliffArea) {
			(GameState.getArea() as CliffArea).opened = true;
			typeMsg(`You violently shove the branch into the keyhole of the door. Somehow, it worked.
The door swings open, revealing the location it had previously blocked.\n\nYou are now able to travel NORTH.`);
			return;
		}
		typeMsg(`You throw the branch. Nothing happens. You pick up the branch, and begin to wonder why you threw it.
Perhaps you could fix the branch with an instruction such as "fix branch".`);
	}
}