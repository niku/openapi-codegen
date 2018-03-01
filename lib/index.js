"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var process_1 = __importDefault(require("process"));
var loader_1 = __importDefault(require("./loader"));
var _a = process_1.default.argv, execPath = _a[0], javascriptFilePath = _a[1], inputPath = _a[2], rest = _a.slice(3);
fs_1.default.readFile(inputPath, "utf8", function (err, data) {
    if (err) {
        // tslint:disable-next-line:no-console
        console.log(err);
        return;
    }
    try {
        var doc = new loader_1.default().safeLoad(data);
        // tslint:disable-next-line:no-console
        console.log(doc);
    }
    catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
    }
});
//# sourceMappingURL=index.js.map