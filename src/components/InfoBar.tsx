import React, { Component } from "react";
import { GameHandler } from "../util/GameHandler";

export class InfoBox extends Component<unknown, { side: string; center: string; color: string | number }> {
	public state = {
		side: "Placeholder",
		center: "Placeholder",
		color: 70,
	};

	componentDidMount() {
		GameHandler.on("setInfo", info => {
			const [left, right] = this.state.side.split("{|}");
			this.setState({
				center: info.center ?? this.state.center,
				side: `${info.left ?? left}{|}${info.right ?? right}`,
			});
		});
		GameHandler.on("infoColor", color => {
			this.setState({ ...this.state, color });
		});
	}

	render() {
		return (
			<blessed-box height={1} style={{ bg: this.state.color }}>
				<blessed-text width="100%" content={this.state.side} tags style={{ bg: this.state.color }} />
				<blessed-text
					left="center"
					content={this.state.center}
					align="center"
					tags
					style={{ bg: this.state.color, bold: true }}
				/>
			</blessed-box>
		);
	}
}
