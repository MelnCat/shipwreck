import type { DisplayBox } from "../components/DisplayBox";
import { GameHandler } from "./GameHandler";
import { GameState } from "./GameState";
import blessed from "neo-blessed";
export const typewriter = (elem: DisplayBox, text: string, reset = true): Promise<void> => new Promise(res => {
	text = blessed.parseTags(text);
	// eslint-disable-next-line no-control-regex
	const textArr = text.match(/(\u001b.+?m|.)/sg) ?? [...text];
	GameState.typing = true;
	GameHandler.emit("blink", false);
	if (reset) elem.setContent("");
	let chars = 0;
	const type: NodeJS.Timeout = setInterval(() => {
		if (chars > textArr.length) {
			GameHandler.off("enter", terminate);
			terminate();
			return;
		}
		elem.setContent(elem.getContent() + (textArr[chars] ?? ""));

		chars++;
	}, 35);
	const oS = (str: string) => str || terminate();
	const terminate = () => {
		elem.setContent(elem.getContent() + textArr.slice(chars).join(""));
		GameHandler.emit("blink", true);
		clearInterval(type);
		GameHandler.off("submit", oS);
		GameHandler.once("submit", () => {
			res();
		});
		GameState.typing = false;
	};
	GameHandler.on("submit", oS);
});