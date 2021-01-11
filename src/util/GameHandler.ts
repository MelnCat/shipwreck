import { TypedEmitter } from "tiny-typed-emitter";
export const GameHandler = new TypedEmitter<{
	content(str: string): void;
	type(str: string, cb?: CallableFunction, reset?: boolean): void;
	enter(): void;
	submit(str: string): void;
	setInfo(opts: { left?: string; center?: string; right?: string }): void;
	image(str?: string): void;
	log(str: string): void;
	infoColor(str: string | number): void;
	blink(bool: boolean): void;
}>();
export const typeMsg = (str: string, reset = true): Promise<void> => new Promise(res => GameHandler.emit("type", str, res, reset));
export const setImage = (str = "") => GameHandler.emit("image", str);