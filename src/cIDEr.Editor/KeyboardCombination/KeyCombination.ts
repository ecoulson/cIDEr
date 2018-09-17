import { KeyMapper } from "./KeyMapping";
import { Key } from "./Keys";

export class KeyCombination {
	private event: React.KeyboardEvent<HTMLDivElement>;
	private key: Key;

	public setCombination(event: React.KeyboardEvent<HTMLDivElement>) {
		this.event = event;
		this.key = KeyMapper(event.keyCode);
	}

	public isCharacterKeyPressed() {
		return !this.event.ctrlKey && 
				!this.event.metaKey &&
				this.key == Key.Character;
	}

	public isKeyPressed(key: Key) {
		return key == this.key;
	}

	public getKey() {
		return this.event.key;
	}
}