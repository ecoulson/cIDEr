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
	private cursor: Cursor;

	constructor(props: IEditorProps) {
		super(props);
		this.cursor = new Cursor();
		this.state = new EditorState();
		this.editorKeyPressAction = this.editorKeyPressAction.bind(this);
		this.updateLinePosition = this.updateLinePosition.bind(this);
		this.updateLine = this.updateLine.bind(this);
	}

	render() {
		console.log(this.state);
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
					cursor={this.cursor}
					focused={lineIndex == this.cursor.getCurrentLine()}
					editorKeyPressAction={this.editorKeyPressAction}
					updateLinePosition={this.updateLinePosition}
					updateLine={this.updateLine}
				>
				</Line>
			)
		})
	}

	private editorKeyPressAction(event: React.KeyboardEvent<HTMLDivElement>) {
		if (this.enterWasPressed(event))
			this.createNewLine(event);
		if (this.shouldRemoveLine(event))
			this.deleteLine();
	}

	private enterWasPressed(event: React.KeyboardEvent<HTMLDivElement>): boolean {
		return event.keyCode == EnterKeyCode;
	}

	private createNewLine(event: React.KeyboardEvent<HTMLDivElement>): void {
		event.preventDefault();
		this.state.lines.splice(this.cursor.getCurrentLine(), InsertLineMode, EmptyLine);
		this.cursor.seekLines(1);
		this.setState({
			lines: this.state.lines
		});
	}
	
	private updateLinePosition(line: number): void {
		if (this.isLineInEditor(line)) {
			this.cursor.setLinePosition(line);
			this.focusOnCurrentLine();
		}
	}

	private isLineInEditor(line: number): boolean {
		return line >= 0 && line < this.state.lines.length
	}

	private focusOnCurrentLine(): void {
		let attributeSelector = `[data-line-number="${this.cursor.getCurrentLine()}"]`;
		let element = document.querySelector(attributeSelector) as HTMLElement;
		element.focus();
	}

	private shouldRemoveLine(event: React.KeyboardEvent<HTMLDivElement>): boolean {
		return event.keyCode == BackSpaceKeyCode && 
				this.cursor.getCurrentColumn() == StartColumn;
	}

	private deleteLine() {
		if (this.canDeleteLine()) {
			this.cursor.seekLines(-1);
			this.state.lines.splice(this.cursor.getCurrentLine(), DeleteLineMode);
			this.setState({
				lines: this.state.lines
			});
		}
	}

	private canDeleteLine(): boolean {
		return this.cursor.getCurrentLine() > StartLine;
	}

	private updateLine(lineNumber: number, lineContent: string) {
		this.state.lines[lineNumber] = lineContent;
		this.setState({
			lines: this.state.lines
		});
	}

	componentDidUpdate() {
		this.focusOnCurrentLine();
	}
}