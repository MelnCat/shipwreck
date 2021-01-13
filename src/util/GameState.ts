import { areas } from "../area/Areas";
import type { AbstractArea } from "../area/AbstractArea";
import { GameHandler, setImage, typeMsg } from "./GameHandler";
import type { Direction } from "./Direction";
import type { AbstractItem } from "../item/AbstractItem";
import { items } from "../item/Items";

export class GameState {
	public static typing = false;
	public static awaitingInput = false;
	public static introDone = false;
	public static inventory: AbstractItem[] = [
		items.staples
	];
	protected static area = areas.initial;
	protected static seen = new Set<string>();

	public static setArea(sel: AbstractArea | string, prepend = "") {
		if (typeof sel === "string") sel = areas[sel];
		if (!sel) return;
		this.area = sel;
		GameHandler.emit("setInfo", { center: sel.name });
		if (sel.image) GameHandler.emit("image", sel.image);
		GameHandler.emit("infoColor", sel.color ?? 70);
		if (sel.firstDesc ?? sel.desc)
			GameHandler.emit(
				"type",
				prepend + (this.seen.has(sel.id) ? sel.desc : sel.firstDesc ?? sel.desc) + sel.showPaths
			);
		if (!this.seen.has(sel.id)) this.seen.add(sel.id);
	}
	public static getItem(str: string) {
		return this.inventory.find(x => x.name.toLowerCase() === str.toLowerCase() || x.alias.some(y => y.toLowerCase() === str.toLowerCase()));
	}
	public static moveDirection(dir: Direction) {
		const newArea = areas[this.area.travel[dir] ?? ""];
		if (!newArea) return typeMsg(this.area.failedMove(dir));
		this.setArea(newArea, newArea.movedDir(dir));
	}
	public static getArea() {
		return this.area;
	}
	public static addItem(sel: string | AbstractItem) {
		if (typeof sel === "string") sel = items[sel];
		if (!sel) return;
		this.inventory.push(sel);
		typeMsg(`You have obtained a(n) ${sel.name}.
\n${(this.seen.has(sel.id) ? sel.desc : sel.firstDesc) ?? sel.desc}`);
		if (sel.image) setImage(sel.image);
		if (!this.seen.has(sel.id)) this.seen.add(sel.id);
	}
	public static removeItem(sel: string | AbstractItem) {
		if (typeof sel === "string") sel = items[sel];
		if (!sel) return;
		const { id } = sel;
		const index = this.inventory.findIndex(x => x.id === id);
		if (!~index) return;
		this.inventory.splice(index, 1);
	}
}
