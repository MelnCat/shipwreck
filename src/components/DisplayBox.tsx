import React, { Component } from "react";
import { GameHandler } from "../util/GameHandler";
import { typewriter } from "../util/typewriter";
import { ContentBox } from "./ContentBox";
import { ImageBox } from "./ImageBox";

export class DisplayBox extends Component<unknown, { imageContent: string; gameContent: string; contentBlink: boolean }> {
	protected contentRef = React.createRef<ContentBox>();
	protected imageRef = React.createRef<ImageBox>();
	public state = {
		imageContent: "",
		gameContent: "Content",
		contentBlink: true
	};

	componentDidMount() {
		GameHandler.on("type", (content, cb) => typewriter(this, content).then(() => cb?.()));
		GameHandler.on("content", content => this.setContent(content));
		GameHandler.on("image", image => this.setImage(image ?? ""));
		GameHandler.on("blink", bool => this.setBlink(bool));
		this.componentDidUpdate();
	}
	componentDidUpdate() {
		const img = this.imageRef.current;
		const content = this.contentRef.current;
		if (img && content) {
			content.setWidth(`100%-${img.getWidth() ?? 0 + 4}`);
		}
	}

	setBlink(bool: boolean) {
		this.setState({ ...this.state, contentBlink: bool });
	}

	setContent(content: string) {
		this.setState({ ...this.state, gameContent: content });
	}

	getContent() {
		return this.state.gameContent;
	}

	setImage(image: string) {
		this.setState({ ...this.state, imageContent: image });
	}

	render() {
		return (
			<>
				<ContentBox ref={this.contentRef} content={this.state.gameContent} shouldBlink={this.state.contentBlink} />
				{this.state.imageContent && <ImageBox ref={this.imageRef} content={this.state.imageContent} />}
			</>
		);
	}
}
