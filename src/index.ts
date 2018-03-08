import fs from "fs";
import process from "process";
import Generator from "./generator";
import Generators from "./generators";
import Loader from "./loader";

const [
  execPath,
  javascriptFilePath,
  inputPath,
  typeOfGenerator,
  ...rest
] = process.argv;

fs.readFile(inputPath, "utf8", (err, data) => {
  if (err) {
    // tslint:disable-next-line:no-console
    console.log(err);
    return;
  }

  try {
    const obj = new Loader().safeLoad(data);
    const codeGeneratingUnit = new Generators(typeOfGenerator, {
      moduleName: "MyModule"
    });
    const doc = codeGeneratingUnit.generate(obj);
    // tslint:disable-next-line:no-console
    console.log(doc);
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }
});
