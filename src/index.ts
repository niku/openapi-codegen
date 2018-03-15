import fs from "fs";
import process from "process";
import Generators from "./Generators";
import Loader from "./Loader";

const [
  execPath,
  javascriptFilePath,
  inputPath,
  outputPath,
  moduleName,
  ...rest
] = process.argv;

function buildConfigFromArguments(...configs: string[]): any {
  const result: any = {};
  try {
    configs.forEach(c => {
      // tslint:disable-next-line:no-console
      console.log(c);
      const [key, value] = c.split("=", 2);
      if (value) {
        result[key] = value;
      } else {
        // tslint:disable-next-line:no-console
        console.warn(`It can't split by "=": ${c}`);
      }
    });
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }

  return result;
}

// Parse config in the argv
const config: any = buildConfigFromArguments(...rest);

fs.readFile(inputPath, "utf8", (err, data) => {
  if (err) {
    // tslint:disable-next-line:no-console
    console.log(err);
    return;
  }

  try {
    const obj = new Loader().safeLoad(data);
    const generators = new Generators(moduleName, outputPath, config);
    const doc = generators.generate(obj);
    // tslint:disable-next-line:no-console
    console.log(doc);
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }
});
