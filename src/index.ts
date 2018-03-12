import fs from "fs";
import process from "process";
import Generators from "./generators";
import Loader from "./loader";

const [execPath, javascriptFilePath, inputPath, type, ...cs] = process.argv;
const config: any = {};

// Parse config in the argv
try {
  cs.forEach(c => {
    // tslint:disable-next-line:no-console
    console.log(c);
    const [key, value] = c.split("=", 2);
    if (value) {
      config[key] = value;
    } else {
      // tslint:disable-next-line:no-console
      console.warn(`It can't split by "=": ${c}`);
    }
  });
} catch (e) {
  // tslint:disable-next-line:no-console
  console.log(e);
}

fs.readFile(inputPath, "utf8", (err, data) => {
  if (err) {
    // tslint:disable-next-line:no-console
    console.log(err);
    return;
  }

  try {
    const obj = new Loader().safeLoad(data);
    const generators = new Generators(type, config);
    const doc = generators.generate(obj);
    // tslint:disable-next-line:no-console
    console.log(doc);
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }
});
