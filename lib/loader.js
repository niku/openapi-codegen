"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var js_yaml_1 = __importDefault(require("js-yaml"));
var Loader = /** @class */ (function () {
    function Loader(loader) {
        if (loader === void 0) { loader = js_yaml_1.default; }
        this.loader = loader;
    }
    Loader.prototype.safeLoad = function (str, opts) {
        return this.loader.safeLoad(str, opts);
    };
    return Loader;
}());
exports.default = Loader;
//# sourceMappingURL=loader.js.map