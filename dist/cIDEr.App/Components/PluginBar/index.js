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
;
var PluginBar = /** @class */ (function (_super) {
    __extends(PluginBar, _super);
    function PluginBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PluginBar.prototype.render = function () {
        return React.createElement("h1", null, "This Is The Plugin Bar");
    };
    return PluginBar;
}(React.Component));
exports.PluginBar = PluginBar;
//# sourceMappingURL=index.js.map