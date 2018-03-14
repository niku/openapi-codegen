"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const handlebars_1 = __importDefault(require("handlebars"));
class Generator {
    constructor(template) {
        this.template = handlebars_1.default.compile(template);
    }
    generate(obj) {
        return this.template(obj);
    }
}
exports.default = Generator;
//# sourceMappingURL=generator.js.map