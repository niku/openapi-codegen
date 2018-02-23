import fs from "fs";

// tslint:disable-next-line:no-console
fs.readFile("package.json", (err, data) => console.log(data.toString()));
