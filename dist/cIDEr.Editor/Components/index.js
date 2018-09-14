"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var initialState = { lines: [""] };
;
var Editor = /** @class */ (function (_super) {
    __extends(Editor, _super);
    function Editor(props) {
        var _this = _super.call(this, props) || this;
        _this.state = initialState;
        _this.lineKeyPressAction = _this.lineKeyPressAction.bind(_this);
        _this.selectLineAction = _this.selectLineAction.bind(_this);
        _this.lineKeyReleasedAction = _this.lineKeyReleasedAction.bind(_this);
        _this.cursor = {
            line: 0
        };
        ;
        return _this;
    }
    Editor.prototype.render = function () {
        return (React.createElement("div", { style: { width: "100vw" } }, this.renderLines()));
    };
    Editor.prototype.renderLines = function () {
        var _this = this;
        return this.state.lines.map(function (line, i) {
            return (React.createElement("div", { key: i, style: { display: "flex" } },
                React.createElement("span", null, i + 1),
                React.createElement("div", { id: "line-" + i, onMouseUp: _this.selectLineAction, onKeyDown: _this.lineKeyPressAction, onKeyUp: _this.lineKeyReleasedAction, tabIndex: -1, suppressContentEditableWarning: true, contentEditable: true, style: {
                        width: "100%",
                        backgroundColor: "rgb(240,240,240)",
                        whiteSpace: "nowrap",
                        outline: "none"
                    } }, line)));
        });
    };
    Editor.prototype.selectLineAction = function (event) {
        var selectedLine = this.getLineElement(event.target);
        if (selectedLine != null) {
            var lineId = selectedLine.id;
            this.cursor.line = parseInt(lineId.split('-')[1], 10);
        }
    };
    Editor.prototype.getLineElement = function (target) {
        if (target == null)
            return target;
        if (target.id.indexOf("line-") != -1)
            return target;
        else
            return this.getLineElement(target.parentElement);
    };
    Editor.prototype.lineKeyPressAction = function (event) {
        if (event.keyCode == 9) {
            event.preventDefault();
        }
        if (event.keyCode == 13) {
            event.preventDefault();
            var lines = this.state.lines;
            lines.splice(this.cursor.line + 1, 0, "");
            this.cursor.line++;
            this.setState({
                lines: lines
            });
        }
        if (this.characterWasEntered(event)) {
            var selectedLine = this.getLineElement(event.target);
            this.state.lines[this.cursor.line] = selectedLine.textContent + event.key;
        }
    };
    Editor.prototype.characterWasEntered = function (event) {
        return (event.keyCode >= 48 && event.keyCode <= 90) ||
            (event.keyCode >= 96 && event.keyCode <= 111) ||
            (event.keyCode >= 186 && event.keyCode <= 222);
    };
    Editor.prototype.lineKeyReleasedAction = function (event) {
        this.removeLineBreaks(this.getLineElement(event.target));
    };
    Editor.prototype.removeLineBreaks = function (line) {
        for (var i = 0; i < line.childElementCount; i++) {
            line.removeChild(line.children[i]);
        }
    };
    Editor.prototype.componentDidUpdate = function () {
        var element = document.getElementById("line-" + this.cursor.line);
        console.log(document.body, element, "line-" + this.cursor.line);
        element.focus();
    };
    return Editor;
}(React.Component));
exports.Editor = Editor;
//# sourceMappingURL=index.js.map