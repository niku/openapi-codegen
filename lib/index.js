"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
// tslint:disable-next-line:no-console
fs_1.default.readFile("package.json", function (err, data) { return console.log(data.toString()); });
//# sourceMappingURL=index.js.map