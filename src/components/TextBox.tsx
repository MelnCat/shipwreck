import React, { Component } from "react";
import type { Widgets } from "neo-blessed";
import { GameHandler } from "../util/GameHandler";

export class TextBox extends Component<unknown, { content: string }> {
	protected boxRef = React.createRef();
	protected focusedBefore = false;

	get box() {
		return this.boxRef.current as Widgets.TextboxElement;
	}

	componentDidMount() {
		this.box.focus();
		this.box.key(["escape", "q", "C-c"], () => process.exit(0));
		this.box.screen.key("enter", () => {
			GameHandler.emit("enter");
			this.box.focus();
		});
	}

	onSubmit() {
		GameHandler.emit("submit", this.box.value);
		this.box.clearValue();
		this.box.screen.render();
		if (this.focusedBefore) this.box.focus();
		else this.focusedBefore = true;
	}

	render() {
		return (
			<blessed-textbox
				ref={this.boxRef}
				bottom={0}
				width="100%"
				height={1}
				style={{ fg: "white", bg: 236 }}
				focused
				inputOnFocus
				onSubmit={this.onSubmit.bind(this)}
			/>
		);
	}
}
