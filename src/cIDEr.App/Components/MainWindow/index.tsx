import * as React from "react";
import { Editor } from "../../../cIDEr.Editor/Components/Editor/Editor";
import { Toolbar } from "../../../cIDEr.Toolbar/Components";
import { FileSystem } from "../../../cIDEr.FileSystem/Components";
import { PluginBar } from "../PluginBar";

export interface MainWindowProps {};

export class MainWindow extends React.Component<MainWindowProps, {}> {
	render() {
		return (
			<div className="cIDEr-container">
				{/* <PluginBar></PluginBar> */}
				{/* <Toolbar></Toolbar> */}
				<Editor></Editor>
				{/* <FileSystem></FileSystem> */}
			</div>
		);
	}
}