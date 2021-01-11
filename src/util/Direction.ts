export enum Direction {
	NORTH = "NORTH",
	EAST = "EAST",
	SOUTH = "SOUTH",
	WEST = "WEST",
}
export const toDirection = (str: string): Direction | null => {
	if (!str) return null;
	const parsed = str.toLowerCase().trim();
	for (const val of Object.values(Direction)) if (parsed === val.toLowerCase()) return val;
	return null;
};
