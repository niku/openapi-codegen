"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var generator_1 = __importDefault(require("./generator"));
var CodeGeneratingUnit = /** @class */ (function () {
    function CodeGeneratingUnit(codeGeneratingUnitType, codeGeneratingConfig) {
        this.codeGeneratingUnitType = codeGeneratingUnitType;
        this.codeGeneratingConfig = codeGeneratingConfig;
    }
    CodeGeneratingUnit.prototype.generate = function (openAPI) {
        var moduleName = this.codeGeneratingConfig.config.moduleName;
        return new generator_1.default().generate({
            moduleName: moduleName,
            openAPI: openAPI
        });
    };
    return CodeGeneratingUnit;
}());
exports.default = CodeGeneratingUnit;
//# sourceMappingURL=code_generating_unit.js.map