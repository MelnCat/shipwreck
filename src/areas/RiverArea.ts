import { AbstractArea } from "../area/AbstractArea";
import { Direction } from "../util/Direction";
import { GameState } from "../util/GameState";

export default class RiverArea extends AbstractArea {
	protected batteryPicked = false;
	public id = "river";
	public name = "River";
	public get desc() {
		return `You are at a river. The water appears to be too dangerous to cross currently.\
${this.batteryPicked ? "" : "\n\nThere is a battery on the ground."}`;
	}
	public firstDesc = `You come across a river. The water is pretty shallow, but the rapids appear to be dangerous.
You aren't sure if it's safe to cross. You notice a battery on the ground.`;
	public image = `\
}  } } ];   " .   ,  '
 ] )  } ) ' " . '    ; .
 } }  ]), :   ' ' . " '"
 ] ) } )" ".  . ' , ' .
}  }  } ]""; '  .  '  .,
 )  )  ) }.   ':" , . ' 
) ]  }  } ) '  '' ". ', ' ,
 } ) ]  ) } :  '  ", ' ," 
}   }  ) ] '  ' ," " " '\
`
		.replace(/[}\])]/g, x => `{${68 + Math.round(Math.random()) * 6}-fg}${x}`)
		.replace(/[,"']/g, x => `{28-fg}${x}`)
		.replace(/[.]/g, x => `{47-fg}${x}`)
		.replace(/[:]/g, x => `{162-fg}${x}`)
		.replace(/[;]/g, x => `{160-fg}${x}`);
	public color = 67;
	public travel = {
		[Direction.EAST]: "grassland",
	};
	public onGrab(command: string, args: string[]) {
		if (this.batteryPicked) return false;
		if (args.join(" ").toLowerCase().includes("battery")) {
			GameState.addItem("battery");
			return this.batteryPicked = true;
		}
		return false;
	}
}
