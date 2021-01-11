import { Direction, toDirection } from "./Direction";
import { GameHandler, typeMsg } from "./GameHandler";
import { GameState } from "./GameState";

export interface ICommand {
	whole?: string[];
	any?: string[];
	exec(command: string, args: string[]): unknown;
}
const commands: ICommand[] = [
	{
		any: ["help"],
		exec() {
			typeMsg(`Try using some instructions such as "inventory", "where am i", "walk east", or "use stick".`);
		},
	},
	{
		whole: ["what"],
		any: ["where", "look"],
		exec() {
			const area = GameState.getArea();
			GameHandler.emit("type", (area.desc ?? "There does not seem to be anything here.") + area.showPaths);
		},
	},
	{
		any: ["move", "travel", "walk", "run", ...Object.values(Direction).map(x => x.toLowerCase())],
		exec(command, args) {
			const dir = toDirection(command) ?? toDirection(args[0]);
			if (!dir && args.length <= 0)
				return typeMsg(
					`You must specify a direction to move. Try "${command} ${Direction.SOUTH.toLowerCase()}".`
				);
			if (!dir)
				return typeMsg(
					`"${(
						args[0] ?? command
					).toUpperCase()}" is not a valid direction. Try one of these: ${Object.values(Direction).join(
						", "
					)}`
				);
			GameState.moveDirection(dir);
		},
	},
	{
		any: ["inv", "items", "inventory"],
		exec() {
			if (!GameState.inventory.length) return typeMsg(`You do not have anything at the moment.`);
			typeMsg(`You have the following items:\n${GameState.inventory.map(x => `{bold}${x.name}{/}`).join(", ")}`);
		},
	},
	{
		any: ["use"],
		exec(command, args) {
			if (!args.length) return typeMsg(`Use what? Please specify.`);
			const name = args.join(" ").toLowerCase().trim();
			const item = GameState.inventory.find(x => x.name.toLowerCase() === name || x.alias.some(y => y.toLowerCase() === name));
			if (!item) return typeMsg(`"${name}" is not a valid item. Try checking your inventory.`); 
			item.onUse(command, args);
		},
	},
	{
		any: ["inspect"],
		exec(command, args) {
			if (!args.length) return typeMsg(`Inspect what? Please specify.`);
			const name = args.join(" ").toLowerCase().trim();
			const item = GameState.inventory.find(x => x.name.toLowerCase() === name || x.alias.some(y => y.toLowerCase() === name));
			if (!item) return typeMsg(`${name} is not a valid item.`); 
			typeMsg(`You take a look at the ${item.name}.\n\n${item.desc}`);
		},
	},
];
if (process.env.NODE_ENV === "development")
	commands.push({
		any: ["debugmove"],
		exec(command, args) {
			if (!args.length) return typeMsg("No arguments.");
			GameState.setArea(args[0]);
		},
	});
export const parseSubmit = (input: string) => {
	if (GameState.typing || !GameState.introDone || GameState.awaitingInput) return;
	const str = input
		.trim()
		.replace(/^i\s+/, "")
		.replace(/[.?,!]+$/, "")
		.replace(/the/, "")
		.replace(/\s+/, " ");
	if (!str) return;
	const args = str.toLowerCase().split(/\s+/);
	const command = args.shift();
	if (!command) return;
	const areaSpecific = GameState.getArea().onCommand(command, args);
	if (!areaSpecific) return;
	const fcommand = commands.find(x => (x.whole?.includes(command) && args.length <= 0) || x.any?.includes(command));
	if (fcommand) {
		fcommand.exec(command, args);
	} else GameHandler.emit("type", `Sorry, I didn't understand what you meant by "${input}".`);
};
