import * as React from "react";
import { ILineNumberProps } from "./ILineNumberProps";

export class LineNumber extends React.Component<ILineNumberProps, {}> {
	render() {
		return (
			<span>{this.props.lineNumber + 1}</span>
		);
	}
}