import { Cursor } from "../../Cursor/Cursor";

export interface IEditorState {
	lines: Array<string>;
	cursor: Cursor;
}