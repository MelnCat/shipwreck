import React from "react";
import blessed from "neo-blessed";
import { InfoBox } from "./components/InfoBar";
import { TextBox } from "./components/TextBox";
import { DisplayBox } from "./components/DisplayBox";
import { createBlessedRenderer } from "react-blessed";

const render = createBlessedRenderer(blessed);

export const screen = blessed.screen({
	smartCSR: true,
	title: "Shipwreck",
	dockBorders: true,
	fullUnicode: true,
	terminal: "xterm-256color",
});

render(
	<blessed-box>
		<InfoBox />
		<blessed-line fg="green" orientation="horizontal" width="100%" top={1} />
		<DisplayBox />
		<TextBox />
	</blessed-box>,
	screen
);

screen.key(["escape", "q", "C-c"], () => process.exit(0));

screen.render();
