import { AbstractItem } from "../item/AbstractItem";
import { typeMsg } from "../util/GameHandler";

export default class Battery extends AbstractItem {
	public id = "battery";
	public name = "Battery";
	public alias = [
		"batteries"
	];
	public firstDesc = "The battery appears to have been unused, and in good condition. How did it get here?"
	public desc = `The battery is a generic AA battery. You better not get this wet.`;
	onUse() {
		typeMsg("You aren't sure if you can {bold}use{/} the battery. Perhaps you could {bold}combine{/} it with something.");
	}
}