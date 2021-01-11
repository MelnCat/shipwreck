import { AbstractArea } from "../area/AbstractArea";
import { Direction } from "../util/Direction";

export default class BeachArea extends AbstractArea {
	public id = "beach";
	public name = "Beach";
	public desc = "You are at a beach. There does not seem to be anything here.";
	public firstDesc = `You get up, and look around. You seem to be in a beach of some sort.
The surroundings reek of smoldering seaweed and unpleasantly aquatic seawater.
Many large wooden logs lie around horizontally on the coarse sand, gradually being decayed and eaten by the vicious bugs that reside within them.

You need to find a way to get back home.`;
	public image = `\
~ ;$^_   ~~  ;$$$$~  ~
 ___//__________ ~ ~&
@______"/]._____)  ~ 
 ~  ^  ':. ~ ~^$$$
 $; ~~      {  ^~
 $^  <  $$; ~~  & ^
    ^~  {  $~   ~  \
`
		.replace(/[__‾)<]/g, x => `{229-fg}${x}`)
		.replace(/[~^]/g, x => `{143-fg}${x}`)
		.replace(/["'/\].:@]/g, x => `{186-fg}${x}`)
		.replace(/[&<{]/g, x => `{145-fg}${x}`)
		.replace(/[;$]/g, x => `{71-fg}${x}`);
	public color = 143;
	public travel = {
		[Direction.NORTH]: "grassland",
		[Direction.SOUTH]: "seashore",
	};
}