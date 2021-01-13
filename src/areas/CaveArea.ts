import { AbstractArea } from "../area/AbstractArea";
import { Direction } from "../util/Direction";

export default class CaveArea extends AbstractArea {
	public id = "cave";
	public name = "Cave";
	public desc = `You are in an underground cave.
There is an inscription on one of the walls, but it is too dark to tell what it says.`
	public firstDesc = `You look around. You seem to be in an underground cave. The floor is damp, and you can hear the faint sound \
of dripping water.
There seems to be something written on one of the walls. It is too dark to see what it is, though.`;
	public image = `\
#    #       #     #
  #       #        # 
   ##    ##     #   
   #    #    #      #
#    #      #     #\
`.replace(/[#]/g, x => `{237-fg}${x}`);
	public color = 241;
	public travel = {
		[Direction.SOUTH]: "cliffs"
	}
}
