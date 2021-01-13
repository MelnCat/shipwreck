import glob from "glob";
import type { AbstractItem } from "./AbstractItem";
import { join } from "path";

export const items: Record<string, AbstractItem> = glob
	.sync(join(__dirname, "../items/**/*.js"))
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	.map(x => require(x).default as { new (): AbstractItem })
	.map(x => new x())
	.reduce((l, c) => ((l[c.id] = c), l), {} as Record<string, AbstractItem>);
