import * as React from "react";

export interface EditorProps { compiler: string; framework: string; };

export class Editor extends React.Component<EditorProps, {}> {
	render() {
		return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
	}
}