"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
class Generators {
    constructor(moduleName, outputPath, config) {
        this.moduleName = moduleName;
        this.outputPath = outputPath;
        this.config = config;
    }
    generate(openAPI) {
        const modulePath = `./${this.moduleName}`;
        Promise.resolve().then(() => __importStar(require(modulePath))).then(({ default: module }) => {
            new module(this.outputPath, this.config).generate(openAPI);
        })
            .catch(e => console.log(e));
    }
}
exports.default = Generators;
//# sourceMappingURL=Generators.js.map