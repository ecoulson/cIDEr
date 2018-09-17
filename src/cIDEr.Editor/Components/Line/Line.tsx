import * as React from "react";
import { Cursor } from "../../Cursor/Cursor";
import { ILineProps } from "./ILineProps";
import { LineStyle } from "./LineStyle";
import { LineState } from "./LineState";
import { LineNumber } from "../LineNumber/LineNumber";
import { KeyCombination } from "../../KeyboardCombination/KeyCombination";
import { Key } from "../../KeyboardCombination/Keys";
import { timingSafeEqual } from "crypto";

const LineNumberAttribute: string = "data-line-number";
const UpArrowKeyCode: number = 38;
const DownArrowKeyCode: number = 40;
const ParseIntBaseExponent: number = 10;

export class Line extends React.Component<ILineProps, {}> {
	readonly state: LineState
	private keyCombination: KeyCombination;

	constructor(props: ILineProps) {
		super(props);
		this.state = new LineState();
		this.keyCombination = new KeyCombination();
		this.setCurrentLine = this.setCurrentLine.bind(this);
		this.handleLineKeyDownAction = this.handleLineKeyDownAction.bind(this);
		this.setColumnPosition = this.setColumnPosition.bind(this);
	}

	render() {
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

	private isTargetElementRendered(target: EventTarget) {
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
		event.preventDefault();
		this.keyCombination.setCombination(event);
		if (this.lineChangeKeyPressed(event))
			this.changeLine(event);
		if (this.columnChangeKeyPressed(event))
			this.changeColumn();
		if (this.keyCombination.isCharacterKeyPressed())
			this.appendCharacterToLine();
		if (this.isDeleteKeyPressed())
			this.deleteLineContent();
		this.props.editorKeyPressAction(event);
	}

	private lineChangeKeyPressed(event: React.KeyboardEvent<HTMLDivElement>) {
		return this.keyCombination.isKeyPressed(Key.ArrowUp) ||
				this.keyCombination.isKeyPressed(Key.ArrowDown);
	}

	private changeLine(event: React.KeyboardEvent<HTMLDivElement>) {
		let currentLine : number = this.props.cursor.getCurrentLine();
		if (this.keyCombination.isKeyPressed(Key.ArrowUp))
			this.props.updateLinePosition(currentLine - 1);
		if (this.keyCombination.isKeyPressed(Key.ArrowDown))
			this.props.updateLinePosition(currentLine + 1);
	}

	private columnChangeKeyPressed(event: React.KeyboardEvent<HTMLDivElement>) {
		return this.keyCombination.isKeyPressed(Key.ArrowLeft) ||
				this.keyCombination.isKeyPressed(Key.ArrowRight);
	}

	private changeColumn() {
		if (this.keyCombination.isKeyPressed(Key.ArrowLeft) && this.props.cursor.getCurrentColumn() > 0)
			this.props.cursor.seekColumns(-1);
		if (this.keyCombination.isKeyPressed(Key.ArrowRight) && this.props.cursor.getCurrentColumn() < this.props.line.length)
			this.props.cursor.seekColumns(1);
	}

	private appendCharacterToLine() {
		this.props.cursor.seekColumns(1);
		this.props.updateLine(
			this.props.lineNumber, 
			this.props.line + this.keyCombination.getKey()
		);
	}

	private isDeleteKeyPressed() {
		return this.keyCombination.isKeyPressed(Key.Delete) ||
				this.keyCombination.isKeyPressed(Key.Backspace);
	}

	private deleteLineContent() {
		// TODO: handle selections
		if (this.props.cursor.getCurrentColumn() > 0) {
			let lineSegmentBeforeDeletion = this.props.line.substring(0, this.props.cursor.getCurrentColumn() - 1);
			let lineSegmentAfterDeletion = this.props.line.substring(this.props.cursor.getCurrentColumn() + 1, this.props.line.length);
			let newLine = lineSegmentBeforeDeletion + lineSegmentAfterDeletion;
			this.props.cursor.seekColumns(-1);
			this.props.updateLine(this.props.lineNumber, newLine);
		}
	}
}