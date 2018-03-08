import Generator from "../src/generator";

it("generates json data to a code", () => {
  const openAPI = {
    info: {
      title: "Minimal API Sepcification",
      version: "0.0.1"
    },
    openapi: "3.0.0",
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
              description: "greet"
            }
          }
        },
        post: {
          requestBody: {
            content: {
              "application/x-www-form-urlencoded": {
                example: {
                  name: "niku"
                },
                schema: {
                  properties: {
                    name: {
                      description: "A name greet for",
                      type: "string"
                    }
                  },
                  type: "object"
                }
              }
            },
            required: true
          },
          responses: {
            "200": {
              content: {
                "text/plain": {
                  example: "hello, niku!",
                  schema: {
                    type: "string"
                  }
                }
              },
              description: "greet to a user"
            }
          },
          "x-elixir-plug-code": 'send_resp(conn, 200, "hello #{name}!")'
        }
      }
    }
  };
  const template = `defmodule {{moduleName}} do
  use Plug.Router

  plug :match
  plug :dispatch

  {{#each openAPI.paths}}
    {{#each this}}
      {{#x-elixir-plug-code}}
  {{@key}} "{{@../key}}" do
    {{{this}}}
  end

      {{/x-elixir-plug-code}}
      {{^x-elixir-plug-code}}
        {{#each responses}}
          {{#each content}}
  {{@../../key}} "{{@../../../key}}" do
    send_resp(conn, {{@../key}}, "{{example}}")
  end

          {{/each}}
        {{/each}}
      {{/x-elixir-plug-code}}
    {{/each}}
  {{/each}}
  match _ do
    send_resp(conn, 404, "oops")
  end
end`;
  const moduleName = "MyRouter";
  expect(new Generator(template).generate({ openAPI, moduleName }))
    .toBe(`defmodule MyRouter do
  use Plug.Router

  plug :match
  plug :dispatch

  get "/hello" do
    send_resp(conn, 200, "hello!")
  end

  post "/hello" do
    send_resp(conn, 200, "hello #{name}!")
  end

  match _ do
    send_resp(conn, 404, "oops")
  end
end`);
});
