"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const js_yaml_1 = __importDefault(require("js-yaml"));
class Loader {
    constructor(loader = js_yaml_1.default) {
        this.loader = loader;
    }
    safeLoad(str, opts) {
        return this.loader.safeLoad(str, opts);
    }
}
exports.default = Loader;
//# sourceMappingURL=loader.js.map