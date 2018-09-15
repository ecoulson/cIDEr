import { ILineState } from "./ILineState";

export class LineState implements ILineState {
	focused: boolean;
	line: string;

	constructor(line: string) {
		this.focused = false;
		this.line = line;
	}
}