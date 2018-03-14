"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const ElixirPlug_1 = __importDefault(require("./ElixirPlug"));
class Generators {
    constructor(type, outputPath, config) {
        this.type = type;
        this.outputPath = outputPath;
        this.config = config;
    }
    generate(openAPI) {
        new ElixirPlug_1.default(this.outputPath, this.config).generate(openAPI);
    }
}
exports.default = Generators;
//# sourceMappingURL=Generators.js.map