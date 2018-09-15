import { Cursor } from "../../Cursor/Cursor";

export interface ILineProps {
	lineNumber: number;
	line: string;
	cursor: Cursor;
	focused: boolean;
	editorKeyPressAction: (event: React.KeyboardEvent<HTMLDivElement>) => any;
	updateLinePosition: (lineNumber: number) => void;
};