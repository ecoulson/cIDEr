import * as React from "react";
import { Editor } from "../../../cIDEr.Editor/Components";
import { Toolbar } from "../../../cIDEr.Toolbar/Components";
import { FileSystem } from "../../../cIDEr.FileSystem/Components";

export interface MainWindowProps {};

export class MainWindow extends React.Component<MainWindowProps, {}> {
	render() {
		return (
			<div className="cIDEr-container">
				<Toolbar></Toolbar>
				<Editor></Editor>
				<FileSystem></FileSystem>
			</div>
		);
	}
}