import * as React from "react";
import { Line } from "../Line/Line";
import { Cursor } from "../../Cursor/Cursor";
import { IEditorProps } from "./IEditorProps";
import { IEditorState } from "./IEditorState";
import { EditorState } from "./EditorState";

export class Editor extends React.Component<IEditorProps, {}> {
	readonly state: IEditorState;
	private cursor: Cursor;

	constructor(props: IEditorProps) {
		super(props);
		this.state = new EditorState();
		this.editorKeyPressAction = this.editorKeyPressAction.bind(this);
		this.updateLinePosition = this.updateLinePosition.bind(this);
		this.cursor = new Cursor();
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
					cursor={this.cursor}
					focused={lineIndex == this.cursor.getCurrentLine()}
					updateLinePosition={this.updateLinePosition}
					editorKeyPressAction={this.editorKeyPressAction}>
				</Line>
			)
		})
	}

	private editorKeyPressAction(event: React.KeyboardEvent<HTMLDivElement>) {
		if (this.enterWasPressed(event))
			this.createNewLine(event);
	}

	private enterWasPressed(event: React.KeyboardEvent<HTMLDivElement>): boolean {
		return event.keyCode == 13;
	}

	private createNewLine(event: React.KeyboardEvent<HTMLDivElement>): void {
		event.preventDefault();
		this.state.lines.splice(this.cursor.getCurrentLine() + 1, 0, "");
		this.cursor.moveLines(1);
		this.setState({
			lines: this.state.lines
		});
	}
	
	private updateLinePosition(line: number): void {
		if (line >= 0 && line < this.state.lines.length) {
			this.cursor.setLinePosition(line);
			this.focusOnCurrentCursorLine(this.cursor);
		}
	}

	private focusOnCurrentCursorLine(cursor: any): void {
		let element = document.getElementById(`line-${cursor.line}`);
		element.focus();
	}

	componentDidUpdate() {
		this.focusOnCurrentCursorLine(this.cursor);
	}
}