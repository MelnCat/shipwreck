import { GameHandler } from "./GameHandler";
import { GameState } from "./GameState";

export const getInput = async (filter?: (str: string) => boolean): Promise<string> => new Promise(res => {
	GameState.awaitingInput = true;
	const finish = (input: string) => {
		GameHandler.off("submit", handler);
		GameState.awaitingInput = false;
		res(input);
	};
	const handler = (input: string) => {
		if (!filter || filter?.(input)) return finish(input);
	};
	GameHandler.on("submit", handler);
});