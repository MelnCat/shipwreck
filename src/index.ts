import "./blessed";
import { GameHandler } from "./util/GameHandler";
import { parseSubmit } from "./util/submission";

import { run } from "./util/intro";
GameHandler.on("submit", str => parseSubmit(str));
GameHandler.emit("setInfo", { left: "", center: "Shipwreck", right: "Shipwreck" });

run();