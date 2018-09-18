import * as React from "react";
import { Line } from "../Line/Line";
import { Cursor } from "../../Cursor/Cursor";
import { IEditorProps } from "./IEditorProps";
import { IEditorState } from "./IEditorState";
import { EditorState } from "./EditorState";

const BackSpaceKeyCode: number = 8;
const EnterKeyCode: number = 13;
const StartColumn: number = 0;
const StartLine: number = 0;
const InsertLineMode: number = 0;
const DeleteLineMode: number = 1;
const EmptyLine: string = "";

export class Editor extends React.Component<IEditorProps, {}> {
	readonly state: IEditorState;

	constructor(props: IEditorProps) {
		super(props);
		this.state = new EditorState();
		this.editorKeyPressAction = this.editorKeyPressAction.bind(this);
		this.updateLinePosition = this.updateLinePosition.bind(this);
		this.updateLine = this.updateLine.bind(this);
	}

	render() {
		return (
			<div style={{width: "100vw"}}>
				{this.renderLines()}
			</div>
		)
	}

	renderLines() {
		return this.state.lines.map((line, lineIndex) => {
			return (
				<Line 
					key={lineIndex}
					lineNumber={lineIndex} 
					line={line}
					cursor={this.state.cursor}
					focused={lineIndex == this.state.cursor.getCurrentLine()}
					editorKeyPressAction={this.editorKeyPressAction}
					updateLinePosition={this.updateLinePosition}
					updateLine={this.updateLine}
				>
				</Line>
			)
		})
	}

	private editorKeyPressAction(event: React.KeyboardEvent<HTMLDivElement>) {
		this.updateCursor();
		if (this.enterWasPressed(event))
			this.createNewLine(event);
		if (this.shouldRemoveLine(event))
			this.deleteLine();
	}

	private updateCursor() {
		this.setState({
			cursor: this.state.cursor
		});
	}

	private enterWasPressed(event: React.KeyboardEvent<HTMLDivElement>): boolean {
		return event.keyCode == EnterKeyCode;
	}

	private createNewLine(event: React.KeyboardEvent<HTMLDivElement>): void {
		event.preventDefault();
		this.state.lines.splice(this.state.cursor.getCurrentLine() + 1, InsertLineMode, EmptyLine);
		this.state.cursor.seekLines(1);
		this.setState({
			lines: this.state.lines
		});
	}
	
	private updateLinePosition(line: number): void {
		if (this.isLineInEditor(line)) {
			this.state.cursor.setLinePosition(line);
			this.focusOnCurrentLine();
		}
	}

	private isLineInEditor(line: number): boolean {
		return line >= 0 && line < this.state.lines.length
	}

	private focusOnCurrentLine(): void {
		this.getCurrentLineElement().focus();
	}

	private getCurrentLineElement() {
		let attributeSelector = `[data-line-number="${this.state.cursor.getCurrentLine()}"]`;
		return document.querySelector(attributeSelector) as HTMLElement;
	}

	private shouldRemoveLine(event: React.KeyboardEvent<HTMLDivElement>): boolean {
		return event.keyCode == BackSpaceKeyCode && 
				this.state.cursor.getCurrentColumn() == StartColumn;
	}

	private deleteLine() {
		if (this.canDeleteLine()) {
			this.state.lines[this.state.cursor.getCurrentLine() - 1] += this.state.lines[this.state.cursor.getCurrentLine()];
			this.state.lines.splice(this.state.cursor.getCurrentLine(), DeleteLineMode);
			this.state.cursor.seekLines(-1);
			this.setState({
				lines: this.state.lines
			});
		}
	}

	private canDeleteLine(): boolean {
		return this.state.cursor.getCurrentLine() > StartLine;
	}

	private updateLine(lineNumber: number, lineContent: string) {
		this.state.lines[lineNumber] = lineContent;
		this.setState({
			lines: this.state.lines
		});
	}

	componentDidUpdate() {
		this.focusOnCurrentLine();
		this.displayCursor();
	}

	private displayCursor() {
		if (this.getCurrentLineElement().hasChildNodes()) {
			let range = document.createRange();
			let lineElement = this.getCurrentLineElement();
			let column = this.state.cursor.getCurrentColumn() >= lineElement.textContent.length ?
				lineElement.textContent.length:
				this.state.cursor.getCurrentColumn();
			range.setStart(lineElement.firstChild, column);
			range.setEnd(lineElement.firstChild, column);
			var selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
		}
	}
}