import { IEditorState } from "./IEditorState";
import { Cursor } from "../../Cursor/Cursor";

export class EditorState implements IEditorState {
	lines: Array<string>;
	cursor: Cursor;

	constructor() {
		this.lines = [""];
		this.cursor = new Cursor();
	}
}