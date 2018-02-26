import fs from "fs";
import Loader from "../src/loader";

it("loads yaml data to match a json object", () => {
  const path = "__tests__/fixtures/minimal.yaml";
  fs.readFile(path, "utf8", (err, data) => {
    const loadObject = new Loader().safeLoad(data);
    expect(loadObject).toHaveProperty("openapi", "3.0.0");
    expect(loadObject).toHaveProperty("info");
    expect(loadObject).toHaveProperty("paths");
  });
});
