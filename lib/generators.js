"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const elixir_plug_1 = __importDefault(require("./elixir_plug"));
class Generators {
    constructor(type, outputPath, config) {
        this.type = type;
        this.outputPath = outputPath;
        this.config = config;
    }
    generate(openAPI) {
        new elixir_plug_1.default(this.outputPath, this.config).generate(openAPI);
    }
}
exports.default = Generators;
//# sourceMappingURL=generators.js.map