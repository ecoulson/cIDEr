import * as React from "react";
import { Cursor } from "../../Cursor/Cursor";
import { ILineProps } from "./ILineProps";
import { LineStyle } from "./LineStyle";
import { LineState } from "./LineState";
import { LineNumber } from "../LineNumber/LineNumber";

const LineNumberAttribute: string = "data-line-number";
const UpArrowKeyCode: number = 38;
const DownArrowKeyCode: number = 40;
const ParseIntBaseExponent: number = 10;

export class Line extends React.Component<ILineProps, {}> {
	readonly state: LineState

	constructor(props: ILineProps) {
		super(props);
		this.state = new LineState(props.line);
		this.setCurrentLine = this.setCurrentLine.bind(this);
		this.handleLineKeyDownAction = this.handleLineKeyDownAction.bind(this);
		this.handleLineKeyUpAction = this.handleLineKeyUpAction.bind(this);
		this.setColumnPosition = this.setColumnPosition.bind(this);
	}

	render() {
		console.log(this.state);
		return(
			<div key={this.props.lineNumber} style= {{display: "flex"}}>
				<LineNumber 
					focused={this.props.focused} 
					lineNumber={this.props.lineNumber}
				/>
				<div 
					data-line-number={this.props.lineNumber} 
					onMouseUp={this.setCurrentLine} 
					onKeyDown={this.handleLineKeyDownAction}
					onKeyUp={this.handleLineKeyUpAction}
					tabIndex={-1}
					suppressContentEditableWarning 
					contentEditable
					style={LineStyle}
				>
				{this.props.line}
				</div>
			</div>
		)
	}

	private setCurrentLine(event: React.MouseEvent<HTMLDivElement>) {
		if (this.isTargetElementRendered(event.target)) {
			let lineElement: Element = this.getLineElement(event.target as Element);
			this.setColumnPosition();
			this.setLinePosition(lineElement);
		}
	}

	private isTargetElementRendered(target: EventTarget): boolean {
		return (target as Element) != null;
	}

	private getLineElement(targetElement: Element): Element {
		if (this.isLineElement(targetElement)) 
			return targetElement;
		else 
			return this.getLineElement(targetElement.parentElement);
	}

	private isLineElement(targetElement: Element): boolean {
		return targetElement.hasAttribute(LineNumberAttribute);
	}

	private setColumnPosition() {
		this.props.cursor.setColumnPosition(
			window.getSelection().getRangeAt(0).endOffset
		);
	}

	private setLinePosition(lineElement: Element) {
		this.props.cursor.setLinePosition(
			parseInt(
				lineElement.getAttribute(LineNumberAttribute), 
				ParseIntBaseExponent
			)
		);
	}

	private handleLineKeyDownAction(event: React.KeyboardEvent<HTMLDivElement>) {
		this.props.editorKeyPressAction(event);
		if (this.lineChangeKeyPressed(event))
			this.changeLine(event);
		else {
			this.setColumnPosition();
		}
	}

	private lineChangeKeyPressed(event: React.KeyboardEvent<HTMLDivElement>): boolean {
		return event.keyCode == UpArrowKeyCode ||
				event.keyCode == DownArrowKeyCode;
	}

	private changeLine(event: React.KeyboardEvent<HTMLDivElement>): void {
		let currentLine : number = this.props.cursor.getCurrentLine();
		switch (event.keyCode) {
			case UpArrowKeyCode:
				this.props.updateLinePosition(currentLine - 1);
				break;
			case DownArrowKeyCode:
				this.props.updateLinePosition(currentLine + 1)
				break;
			default:
				break;
		}
	}

	private handleLineKeyUpAction(event: React.KeyboardEvent<HTMLDivElement>) {
		let lineElement : Element = event.target as Element;
		this.props.updateLine(this.props.lineNumber, lineElement.textContent);
	}
}