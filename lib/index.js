"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var process_1 = __importDefault(require("process"));
var generators_1 = __importDefault(require("./generators"));
var loader_1 = __importDefault(require("./loader"));
var _a = process_1.default.argv, execPath = _a[0], javascriptFilePath = _a[1], inputPath = _a[2], outputPath = _a[3], type = _a[4], cs = _a.slice(5);
var config = {};
// Parse config in the argv
try {
    cs.forEach(function (c) {
        // tslint:disable-next-line:no-console
        console.log(c);
        var _a = c.split("=", 2), key = _a[0], value = _a[1];
        if (value) {
            config[key] = value;
        }
        else {
            // tslint:disable-next-line:no-console
            console.warn("It can't split by \"=\": " + c);
        }
    });
}
catch (e) {
    // tslint:disable-next-line:no-console
    console.log(e);
}
fs_1.default.readFile(inputPath, "utf8", function (err, data) {
    if (err) {
        // tslint:disable-next-line:no-console
        console.log(err);
        return;
    }
    try {
        var obj = new loader_1.default().safeLoad(data);
        var generators = new generators_1.default(type, outputPath, config);
        var doc = generators.generate(obj);
        // tslint:disable-next-line:no-console
        console.log(doc);
    }
    catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
    }
});
//# sourceMappingURL=index.js.map