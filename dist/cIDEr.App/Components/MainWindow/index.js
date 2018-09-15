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
var Editor_1 = require("../../../cIDEr.Editor/Components/Editor/Editor");
;
var MainWindow = /** @class */ (function (_super) {
    __extends(MainWindow, _super);
    function MainWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainWindow.prototype.render = function () {
        return (React.createElement("div", { className: "cIDEr-container" },
            React.createElement(Editor_1.Editor, null)));
    };
    return MainWindow;
}(React.Component));
exports.MainWindow = MainWindow;
//# sourceMappingURL=index.js.map