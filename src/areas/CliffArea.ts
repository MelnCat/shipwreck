import { AbstractArea } from "../area/AbstractArea";
import { Direction } from "../util/Direction";
import { typeMsg } from "../util/GameHandler";

export default class CliffArea extends AbstractArea {
	protected attemptedUnlock = false;
	public opened = false;
	public id = "cliffs";
	public name = "Cliffs";
	public get desc() {
		return `You are next to an unscalably steep cliff. The surface is rugged and rough. You've seen tall walls before, but this is on another level.
\n${
	this.opened
		? "The door on the side of the cliff is unlocked."
		: `There is a locked door on the side of the cliff. You may be able to {bold}unlock{/} it.`
}`;
	}
	public firstDesc = `You come across an immensely tall cliff. The height is unfathomable, and you find yourself unable to see the top.\n
There seems to be a door on the side of the cliff. However, it seems to be locked. Perhaps you could {bold}unlock{/} it.`;
	public image = `\
  /#  / }# |  #[ #} \\
 /# #/ #{  } # {  [ #\\
'--./_# { #| # ]__---"
 ~    "'-------"  ~   ~
~ ^* ~  ^  ~   *    ~~
   ~ ^* ~~      ~^ *   ~
~~*   ~   ~* ^    ~  ^ ~\
`.replace(/[/\\[\]{}|"'-]/g, x => `{246-fg}${x}`)
		.replace(/[~^]/g, x => `{28-fg}${x}`)
		.replace(/[*]/g, x => `{70-fg}${x}`)
		.replace(/[#]/g, x => `{237-fg}${x}`);
	public color = 244;
	public get travel() {
		return {
			[Direction.SOUTH]: "grassland",
			...(this.opened ? { [Direction.NORTH]: "cave" } : null),
		};
	}
	public onCommand(command: string, args: string[]) {
		if (command === "unlock") {
			if (this.opened) typeMsg(`The door is already unlocked.`);
			else
				typeMsg(
					this.attemptedUnlock
						? `The door is still locked. Perhaps you could force it open by using an item.`
						: (this.attemptedUnlock = true, `You attempt to push open the door, but failed. You need to find the key for the keyhole, unless you could force it open.`)
				);
			return false;
		}
		return true;
	}
}
