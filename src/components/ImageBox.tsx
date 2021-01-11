import type { Widgets } from "neo-blessed";
import React, { Component } from "react";

interface IImageBoxProps {
	content: string;
}
export class ImageBox extends Component<IImageBoxProps> {
	protected textRef = React.createRef<Widgets.TextElement>();

	public constructor(props: IImageBoxProps) {
		super(props);
	}

	getWidth() {
		if (!this.textRef.current?.lpos) return;
		return this.textRef.current.lpos.xl - this.textRef.current.lpos.xi;
	}

	render() {
		return (
			<blessed-text
				top={2}
				right={0}
				style={{ border: { fg: 246 } }}
				border={{ type: "line" }}
				content={this.props.content}
				tags
				ref={this.textRef}
			/>
		);
	}
}
