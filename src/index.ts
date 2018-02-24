import fs from "fs";
import yaml from "js-yaml";
import process from "process";

const [execPath, javascriptFilePath, inputPath, ...rest] = process.argv;

fs.readFile(inputPath, "utf8", (err, data) => {
  if (err) {
    // tslint:disable-next-line:no-console
    console.log(err);
    return;
  }

  try {
    const doc = yaml.safeLoad(data);
    // tslint:disable-next-line:no-console
    console.log(doc);
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }
});
