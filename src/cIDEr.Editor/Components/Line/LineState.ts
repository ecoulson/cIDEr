import { ILineState } from "./ILineState";

export class LineState implements ILineState {
	focused: boolean;
	line: string;

	constructor() {
		this.focused = false;
		this.line = "";
	}
}