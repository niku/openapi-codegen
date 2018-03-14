"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const fs_1 = __importDefault(require("fs"));
const process_1 = __importDefault(require("process"));
const Generator_1 = __importDefault(require("./Generator"));
class ElixirPlug {
    constructor(outputPath, config) {
        this.template = `defmodule {{moduleName}} do
  use Plug.Router

  plug Plug.Parsers, parsers: [:urlencoded, :multipart]

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
        this.outputPath = outputPath;
        this.config = config;
        this.generators = [new Generator_1.default(this.template)];
    }
    generate(openAPI) {
        process_1.default.chdir(this.outputPath);
        const command = `mix new ${this.config.path} --sup`;
        const appName = this.config.path.charAt(0).toUpperCase() + this.config.path.slice(1);
        const moduleName = appName + "." + "Router";
        child_process_1.default.exec(command, (error, stdout, strerr) => {
            this.generators.forEach(generator => {
                const routerPath = `${this.config.path}/lib/${this.config.path}/router.ex`;
                fs_1.default.writeFile(routerPath, generator.generate({ openAPI, moduleName }), err => null);
            });
            // replace application.ex
            const applicationPath = `${this.config.path}/lib/${this.config.path}/application.ex`;
            fs_1.default.readFile(applicationPath, "utf8", (err, data) => {
                if (err) {
                    // tslint:disable-next-line:no-console
                    return console.log(err);
                }
                const result = data.replace(/# {Foo.Worker, arg},/g, `# {Foo.Worker, arg},
      {Plug.Adapters.Cowboy2, scheme: :http, plug: ${appName}.Router}`);
                fs_1.default.writeFile(applicationPath, result, e => {
                    if (e) {
                        // tslint:disable-next-line:no-console
                        return console.log(err);
                    }
                });
            });
            // replace mix.exs
            const mixPath = `${this.config.path}/mix.exs`;
            fs_1.default.readFile(mixPath, "utf8", (err, data) => {
                if (err) {
                    // tslint:disable-next-line:no-console
                    return console.log(err);
                }
                const result = data.replace(/# {:dep_from_git, git: "https:\/\/github.com\/elixir-lang\/my_dep.git", tag: "0\.1\.0"},/g, `# {:dep_from_git, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"},
      {:cowboy, "~> 2.2.2"},
      {:plug, "~> 1.5.0-rc.2"}`);
                fs_1.default.writeFile(mixPath, result, e => {
                    if (e) {
                        // tslint:disable-next-line:no-console
                        return console.log(err);
                    }
                });
            });
        });
    }
}
exports.default = ElixirPlug;
//# sourceMappingURL=ElixirPlug.js.map