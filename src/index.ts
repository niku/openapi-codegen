import fs from "fs";
import process from "process";
import Loader from "./loader";
import Generator from "./generator";

const [execPath, javascriptFilePath, inputPath, ...rest] = process.argv;

fs.readFile(inputPath, "utf8", (err, data) => {
  if (err) {
    // tslint:disable-next-line:no-console
    console.log(err);
    return;
  }

  try {
    const obj = new Loader().safeLoad(data);
    const doc = new Generator().generate({
      moduleName: "MyModule",
      openAPI: obj
    });
    // tslint:disable-next-line:no-console
    console.log(doc);
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }
});
