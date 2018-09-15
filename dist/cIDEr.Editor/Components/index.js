"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Line_1 = require("./Line");
var Cursor_1 = require("../Cursor/Cursor");
var initialState = { lines: [""] };
;
var Editor = /** @class */ (function (_super) {
    __extends(Editor, _super);
    function Editor(props) {
        var _this = _super.call(this, props) || this;
        _this.state = initialState;
        _this.editorKeyPressAction = _this.editorKeyPressAction.bind(_this);
        _this.updateLinePosition = _this.updateLinePosition.bind(_this);
        _this.cursor = new Cursor_1.Cursor();
        return _this;
    }
    Editor.prototype.render = function () {
        return (React.createElement("div", { style: { width: "100vw" } }, this.renderLines()));
    };
    Editor.prototype.renderLines = function () {
        var _this = this;
        return this.state.lines.map(function (line, i) {
            return (React.createElement(Line_1.Line, { key: i, lineNumber: i, line: line, cursor: _this.cursor, updateLinePosition: _this.updateLinePosition, editorKeyPressAction: _this.editorKeyPressAction }));
        });
    };
    Editor.prototype.editorKeyPressAction = function (event) {
        if (this.enterWasPressed(event))
            this.createNewLine(event);
    };
    Editor.prototype.enterWasPressed = function (event) {
        return event.keyCode == 13;
    };
    Editor.prototype.createNewLine = function (event) {
        event.preventDefault();
        this.state.lines.splice(this.cursor.getCurrentLine() + 1, 0, "");
        this.cursor.moveLines(1);
        this.setState({
            lines: this.state.lines
        });
    };
    Editor.prototype.updateLinePosition = function (line) {
        if (line >= 0 && line < this.state.lines.length) {
            this.cursor.setLinePosition(line);
            this.focusOnCurrentCursorLine(this.cursor);
        }
    };
    Editor.prototype.focusOnCurrentCursorLine = function (cursor) {
        var element = document.getElementById("line-" + cursor.line);
        element.focus();
    };
    Editor.prototype.componentDidUpdate = function () {
        this.focusOnCurrentCursorLine(this.cursor);
    };
    return Editor;
}(React.Component));
exports.Editor = Editor;
//# sourceMappingURL=index.js.map