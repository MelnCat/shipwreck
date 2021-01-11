import glob from "glob";
import type { AbstractArea } from "./AbstractArea";
import { join } from "path";

export const areas: Record<string, AbstractArea> = glob
	.sync(join(__dirname, "../areas/**/*.js"))
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	.map(x => require(x).default as { new (): AbstractArea })
	.map(x => new x())
	.reduce((l, c) => ((l[c.id] = c), l), {} as Record<string, AbstractArea>);