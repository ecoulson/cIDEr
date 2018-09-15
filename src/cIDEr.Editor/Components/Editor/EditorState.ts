import { IEditorState } from "./IEditorState";

export class EditorState implements IEditorState {
	lines: Array<string>;

	constructor() {
		this.lines = [""];
	}
}