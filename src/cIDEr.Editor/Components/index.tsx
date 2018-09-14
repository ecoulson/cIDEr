import * as React from "react";

const initialState = { lines: [""] }
type State = Readonly<typeof initialState>

export interface EditorProps {};
export class Editor extends React.Component<EditorProps, {}> {
	readonly state: State;
	private cursor: any;

	constructor(props: EditorProps) {
		super(props);
		this.state = initialState;
		this.lineKeyPressAction = this.lineKeyPressAction.bind(this);
		this.selectLineAction = this.selectLineAction.bind(this);
		this.lineKeyReleasedAction = this.lineKeyReleasedAction.bind(this);
		this.cursor = {
			line: 0
		};;
	}

	render() {
		return (
			<div style={{width: "100vw"}}>
				{this.renderLines()}
			</div>
		)
	}

	renderLines() {
		return this.state.lines.map((line, i) => {
			return (
				<div key={i} style= {{display: "flex"}}>
					<span>{i + 1}</span>
					<div 
						id={`line-${i}`} 
						onMouseUp={this.selectLineAction} 
						onKeyDown={this.lineKeyPressAction} 
						onKeyUp={this.lineKeyReleasedAction}
						tabIndex={-1}
						suppressContentEditableWarning 
						contentEditable 
						style={
							{
								width: "100%",
								backgroundColor: `rgb(240,240,240)`,
								whiteSpace: "nowrap",
								outline: "none"
							}
						}
					>
					{line}
					</div>
				</div>
			)
		})
	}

	private selectLineAction(event: React.MouseEvent<HTMLDivElement>) {
		let selectedLine: Element = this.getLineElement(event.target as Element);
		if (selectedLine != null) {
			let lineId = selectedLine.id;
			this.cursor.line = parseInt(lineId.split('-')[1], 10);
		}
	}

	private getLineElement(target: Element): Element {
		if (target == null)
			return target;
		if (target.id.indexOf("line-") != -1) 
			return target;
		else 
			return this.getLineElement(target.parentElement);
	}

	private lineKeyPressAction(event: React.KeyboardEvent<HTMLDivElement>) {
		if (event.keyCode == 9) {
			event.preventDefault();
		}
		if (event.keyCode == 13) {
			event.preventDefault();
			let lines = this.state.lines;
			lines.splice(this.cursor.line + 1, 0, "");
			this.cursor.line++;
			this.setState({
				lines: lines
			});
		}
		if (this.characterWasEntered(event)) {
			let selectedLine = this.getLineElement(event.target as Element);
			this.state.lines[this.cursor.line] = selectedLine.textContent + event.key;
		}
	}

	private characterWasEntered(event: React.KeyboardEvent<HTMLDivElement>): boolean {
		return (event.keyCode >= 48 && event.keyCode <= 90) || 
				(event.keyCode >= 96 && event.keyCode <= 111) ||
				(event.keyCode >= 186 && event.keyCode <= 222);   
	}

	private lineKeyReleasedAction(event: React.KeyboardEvent<HTMLDivElement>) {
		this.removeLineBreaks(this.getLineElement(event.target as Element));
	}

	private removeLineBreaks(line: Element) {
		for (let i = 0; i < line.childElementCount; i++) {
			line.removeChild(line.children[i]);
		}
	}

	componentDidUpdate() {
		let element = document.getElementById(`line-${this.cursor.line}`);
		console.log(document.body, element, `line-${this.cursor.line}`);
		element.focus();
	}
}