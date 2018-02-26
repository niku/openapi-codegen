import Generator from "../src/generator";

it("generates json data to a code", () => {
  const obj = {
    paths: {
      "/hello": {
        get: {
          responses: {
            "200": {
              content: {
                "text/plain": {
                  example: "hello!",
                  schema: {
                    type: "string"
                  }
                }
              },
              description: "greeting"
            }
          }
        }
      }
    }
  };
  expect(new Generator().generate(obj)).toBe(`defmodule MyRouter do
  end`);
});
