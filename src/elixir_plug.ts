import child_process from "child_process";
import fs from "fs";
import Handlebars from "handlebars";
import process from "process";
import Generator from "./generator";

export default class ElixirPlug {
  private readonly generators: Generator[];
  private readonly config: any;
  private template = `defmodule {{moduleName}} do
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
end
`;

  constructor(config: any) {
    this.config = config;
    this.generators = [new Generator(this.template)];
  }

  public generate(openAPI: any): void {
    process.chdir("tmp");
    const command = `mix new ${this.config.path} --sup`;
    const moduleName =
      this.config.path.charAt(0).toUpperCase() +
      this.config.path.slice(1) +
      "." +
      "Router";
    child_process.exec(command, (error, stdout, strerr) => {
      this.generators.forEach(generator => {
        const path = `${this.config.path}/lib/${this.config.path}/router.ex`;
        fs.writeFile(
          path,
          generator.generate({ openAPI, moduleName }),
          err => null
        );
      });
    });
  }
}
