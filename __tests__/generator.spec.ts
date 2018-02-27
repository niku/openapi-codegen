import Generator from "../src/generator";

it("generates json data to a code", () => {
  const openAPI = {
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
  const moduleName = "MyRouter";
  expect(new Generator().generate({ openAPI, moduleName }))
    .toBe(`defmodule MyRouter do
  use Plug.Router

  plug :match
  plug :dispatch

  get "/hello" do
    send_resp(conn, 200, "hello!")
  end

  match _ do
    send_resp(conn, 404, "oops")
  end
end`);
});
