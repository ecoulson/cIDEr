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
;
var FileSystem = /** @class */ (function (_super) {
    __extends(FileSystem, _super);
    function FileSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileSystem.prototype.render = function () {
        return React.createElement("h1", null, "This Is The File System");
    };
    return FileSystem;
}(React.Component));
exports.FileSystem = FileSystem;
//# sourceMappingURL=index.js.map