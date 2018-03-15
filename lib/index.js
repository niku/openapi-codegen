"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const process_1 = __importDefault(require("process"));
const Generators_1 = __importDefault(require("./Generators"));
const Loader_1 = __importDefault(require("./Loader"));
const [execPath, javascriptFilePath, inputPath, outputPath, moduleName, ...cs] = process_1.default.argv;
const config = {};
// Parse config in the argv
try {
    cs.forEach(c => {
        // tslint:disable-next-line:no-console
        console.log(c);
        const [key, value] = c.split("=", 2);
        if (value) {
            config[key] = value;
        }
        else {
            // tslint:disable-next-line:no-console
            console.warn(`It can't split by "=": ${c}`);
        }
    });
}
catch (e) {
    // tslint:disable-next-line:no-console
    console.log(e);
}
fs_1.default.readFile(inputPath, "utf8", (err, data) => {
    if (err) {
        // tslint:disable-next-line:no-console
        console.log(err);
        return;
    }
    try {
        const obj = new Loader_1.default().safeLoad(data);
        const generators = new Generators_1.default(moduleName, outputPath, config);
        const doc = generators.generate(obj);
        // tslint:disable-next-line:no-console
        console.log(doc);
    }
    catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
    }
});
//# sourceMappingURL=index.js.map