export class Cursor {
	private line: number;
	private column: number;

	constructor() {
		this.line = 0;
		this.column = 0;
	}

	moveLines(lineCount: number) {
		this.line += lineCount;
	}

	moveColumns(columnCount: number) {
		this.column += columnCount;
	}

	setLinePosition(line: number) {
		this.line = line;
	}

	setColumnPosition(column: number) {
		this.column = column;
	}

	getCurrentLine(): number {
		return this.line;
	}

	getCurrentColumn(): number {
		return this.column;
	}
}