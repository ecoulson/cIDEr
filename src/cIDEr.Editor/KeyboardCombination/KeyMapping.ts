import { Key } from "./Keys";

const KeyMappings: {[ keyCode: number]: Key} = {
	8: Key.Backspace,
	9: Key.Tab,
	12: Key.Clear,
	13: Key.Enter,
	16: Key.Shift,
	17: Key.Control,
	18: Key.Alt,
	20: Key.CapsLock,
	27: Key.Escape,
	33: Key.PageUp,
	34: Key.PageDown,
	35: Key.End,
	36: Key.Home,
	37: Key.ArrowLeft,
	38: Key.ArrowUp,
	39: Key.ArrowRight,
	40: Key.ArrowDown,
	45: Key.Help,
	46: Key.Delete,
	91: Key.Meta,
	93: Key.ContextMenu,
	112: Key.F1,
	113: Key.F2,
	114: Key.F3,
	115: Key.F4,
	116: Key.F5,
	117: Key.F6,
	118: Key.F7,
	119: Key.F8,
	120: Key.F9,
	121: Key.F10,
	122: Key.F11,
	123: Key.F12,
	124: Key.F13
};
const MappingKeys: string[] = Object.keys(KeyMappings);

export function KeyMapper(keyCode: number): Key {
	if (mappingContainsKeyCode(keyCode))
		return KeyMappings[keyCode];
	else
		return Key.Character;
}

function mappingContainsKeyCode(keyCode: number) {
	return MappingKeys.indexOf(keyCode.toString()) != -1;
}