import React, { Component } from "react";

export class ContentBox extends Component<
	{ content: string; shouldBlink: boolean },
	{ width: string; cursor: boolean }
> {
	public state = {
		width: "100%",
		cursor: true,
	};
	protected blinkInterval?: NodeJS.Timeout;

	public constructor(props: { content: string; shouldBlink: boolean }) {
		super(props);
	}
	componentDidMount() {
		this.blinkInterval = setInterval(() => {
			this.setState({
				...this.state,
				cursor: this.props.shouldBlink ? !this.state.cursor : true,
			});
		}, 580);
	}

	componentWillUnmount() {
		if (this.blinkInterval) clearInterval(this.blinkInterval);
	}

	setWidth(width: string) {
		this.setState({ width });
	}

	render() {
		return (
			<blessed-box height="100%-2" width={this.state.width} top={2}>
				<blessed-text content={`${this.props.content}${this.state.cursor ? "█" : ""}`} tags />
			</blessed-box>
		);
	}
}
