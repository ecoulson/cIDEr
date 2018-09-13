import * as React from "react";
import * as ReactDOM from "react-dom";

import { Editor } from "../cIDEr.Editor";

ReactDOM.render(
	<Editor compiler="TypeScript" framework="React" />,
	document.getElementById("app")
);