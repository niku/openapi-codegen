"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = __importDefault(require("handlebars"));
var Generator = /** @class */ (function () {
    function Generator(template) {
        this.template = handlebars_1.default.compile(template);
    }
    Generator.prototype.generate = function (obj) {
        return this.template(obj);
    };
    return Generator;
}());
exports.default = Generator;
//# sourceMappingURL=generator.js.map