import * as React from "react";
import { Cursor } from "../../Cursor/Cursor";
import { ILineProps } from "./ILineProps";
import { LineStyle } from "./LineStyle";
import { LineState } from "./LineState";
import { LineNumber } from "../LineNumber/LineNumber";

export class Line extends React.Component<ILineProps, {}> {
	readonly state: LineState
	private cursor: Cursor;

	constructor(props: ILineProps) {
		super(props);
		this.state = new LineState();
		this.cursor = props.cursor;
		this.makeCurrentLine = this.makeCurrentLine.bind(this);
		this.handleLineAction = this.handleLineAction.bind(this);
	}

	render() {
		return(
			<div key={this.props.lineNumber} style= {{display: "flex"}}>
				<LineNumber 
					focused={this.props.focused} 
					lineNumber={this.props.lineNumber}
				/>
				<div 
					id={`line-${this.props.lineNumber}`} 
					onMouseUp={this.makeCurrentLine} 
					onKeyDown={this.handleLineAction} 
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

	private makeCurrentLine(event: React.MouseEvent<HTMLDivElement>) {
		if (this.isTargetElementRendered(event.target)) {
			let lineElement: Element = this.getLineElement(event.target as Element);
			let lineNumber = this.getLineNumber(lineElement);
			this.cursor.setLinePosition(lineNumber);
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

	private getLineNumber(lineElement: Element): number {
		return parseInt(lineElement.id.split('-')[1], 10);
	}

	private isLineElement(targetElement: Element): boolean {
		return targetElement.id.indexOf("line-") != -1;
	}

	private handleLineAction(event: React.KeyboardEvent<HTMLDivElement>) {
		this.props.editorKeyPressAction(event);
		if (this.arrowKeyPressed(event))
			this.moveCursor(event);
	}

	private arrowKeyPressed(event: React.KeyboardEvent<HTMLDivElement>): boolean {
		return event.keyCode >= 37 && event.keyCode <= 40;
	}

	private moveCursor(event: React.KeyboardEvent<HTMLDivElement>): void {
		switch (event.keyCode) {
			case 37:
				break;
			case 38:
				this.props.updateLinePosition(this.cursor.getCurrentLine() - 1);
				break;
			case 39:
				break;
			case 40:
				this.props.updateLinePosition(this.cursor.getCurrentLine() + 1)
				break;
			default:
				break;
		}
	}
}