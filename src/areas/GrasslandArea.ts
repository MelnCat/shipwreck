import { AbstractArea } from "../area/AbstractArea";
import { Direction } from "../util/Direction";
import { typeMsg } from "../util/GameHandler";
import { GameState } from "../util/GameState";

export default class GrasslandArea extends AbstractArea {
	protected stickPicked = false;
	public id = "grassland";
	public name = "Grassland";
	public get desc() {
		return `You are at a small grassy plains.${this.stickPicked ? "" : " There is a broken branch on the ground."}`;
	}
	public firstDesc = `You are at a small grassy plains. The ground is covered in soil, grass, and a wide variety of plants.
You notice a broken branch on the ground. It had likely been broken by a wild animal, but it could have been broken by something, or someone else.
Perhaps it could be of use.`;
	public image = `\
"; '  ,   " .   ,  ":
"    .  : '    . ,; . "
,:  ' ;" "  ,  . " , .' "
.    .  . " ' ' .  . ';
" ".   . ' , '. :' , ' .
""; . '  .  ; '  .   ,
.   ':" , .  . ' " ' ' 
'  '  . ' " . ',  '' , .\
`
		.replace(/[,"']/g, x => `{28-fg}${x}`)
		.replace(/[.]/g, x => `{47-fg}${x}`)
		.replace(/[:]/g, x => `{98-fg}${x}`)
		.replace(/[;]/g, x => `{160-fg}${x}`);
	public color = 76;
	public travel = {
		[Direction.NORTH]: "cliffs",
		[Direction.SOUTH]: "beach",
	};
	/** @override */
	public onCommand(command: string, args: string[]) {
		if (["pick", "obtain", "grab", "take"].some(x => x === command)) {
			if (args[0] === "up") args.shift();
			if (args.join(" ").includes("branch") && !this.stickPicked) {
				GameState.addItem("broken_branch");
				this.stickPicked = true;
			}
			else if (!args.length) typeMsg(`What do you want to ${command}? Please clarify.`);
			else typeMsg(`There isn't a(n) ${args.join(" ")} here.`);
			return false;
		} else return true;
	}
}
