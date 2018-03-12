"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var elixir_plug_1 = __importDefault(require("./elixir_plug"));
var Generators = /** @class */ (function () {
    function Generators(type, outputPath, config) {
        this.type = type;
        this.outputPath = outputPath;
        this.config = config;
    }
    Generators.prototype.generate = function (openAPI) {
        new elixir_plug_1.default(this.outputPath, this.config).generate(openAPI);
    };
    return Generators;
}());
exports.default = Generators;
//# sourceMappingURL=generators.js.map