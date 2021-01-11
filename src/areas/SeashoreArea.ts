import { AbstractArea } from "../area/AbstractArea";
import { Direction } from "../util/Direction";

export default class SeashoreArea extends AbstractArea {
	public id = "seashore";
	public name = "Seashore";
	public desc = `You are at the edge of the beach. The water glistens in the bright sunshine.
You notice how there are no one selling seashells here. You have been lied to.`;
	public firstDesc = `You are at the edge of the beach. You can see the waves gently rise up, and fall back down.
You could watch this all day. Unfortunately, you do not have all day. You better get moving.`;
	public image = `\
~  ~~ $$ ~    ~~  ~ ~~  $ ~
.____..__  *~  $* * ~~  ____
-'  ^    ";.___.------'"
^    ^    ,       ^   ^##,
  ^#,   ^## ^  , #  ^    ^
 ^ #  ^     ,  ^   #   ^\
`
		.replace(/[-'_.";]/g, x => `{31-fg}${x}`)
		.replace(/[\^,]/g, x => `{143-fg}${x}`)
		.replace(/[~]/g, x => `{32-fg}${x}`)
		.replace(/[*]/g, x => `{87-fg}${x}`)
		.replace(/[$]/g, x => `{22-fg}${x}`)
		.replace(/[#]/g, x => `{28-fg}${x}`);
	public color = 38;
	public travel = {
		[Direction.NORTH]: "beach",
	};
}
