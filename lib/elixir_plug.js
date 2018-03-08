"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = __importDefault(require("child_process"));
var fs_1 = __importDefault(require("fs"));
var process_1 = __importDefault(require("process"));
var generator_1 = __importDefault(require("./generator"));
var ElixirPlug = /** @class */ (function () {
    function ElixirPlug(config) {
        this.template = "defmodule {{moduleName}} do\n  use Plug.Router\n\n  plug :match\n  plug :dispatch\n\n  {{#each openAPI.paths}}\n    {{#each this}}\n      {{#x-elixir-plug-code}}\n  {{@key}} \"{{@../key}}\" do\n    {{{this}}}\n  end\n\n      {{/x-elixir-plug-code}}\n      {{^x-elixir-plug-code}}\n        {{#each responses}}\n          {{#each content}}\n  {{@../../key}} \"{{@../../../key}}\" do\n    send_resp(conn, {{@../key}}, \"{{example}}\")\n  end\n\n          {{/each}}\n        {{/each}}\n      {{/x-elixir-plug-code}}\n    {{/each}}\n  {{/each}}\n  match _ do\n    send_resp(conn, 404, \"oops\")\n  end\nend\n";
        this.config = config;
        this.generators = [new generator_1.default(this.template)];
    }
    ElixirPlug.prototype.generate = function (openAPI) {
        var _this = this;
        process_1.default.chdir("tmp");
        var command = "mix new " + this.config.path + " --sup";
        var appName = this.config.path.charAt(0).toUpperCase() + this.config.path.slice(1);
        var moduleName = appName + "." + "Router";
        child_process_1.default.exec(command, function (error, stdout, strerr) {
            _this.generators.forEach(function (generator) {
                var routerPath = _this.config.path + "/lib/" + _this.config.path + "/router.ex";
                fs_1.default.writeFile(routerPath, generator.generate({ openAPI: openAPI, moduleName: moduleName }), function (err) { return null; });
            });
            // replace application.ex
            var applicationPath = _this.config.path + "/lib/" + _this.config.path + "/application.ex";
            fs_1.default.readFile(applicationPath, "utf8", function (err, data) {
                if (err) {
                    // tslint:disable-next-line:no-console
                    return console.log(err);
                }
                var result = data.replace(/# {Foo.Worker, arg},/g, "# {Foo.Worker, arg},\n      {Plug.Adapters.Cowboy2, scheme: :http, plug: " + appName + ".Router}");
                fs_1.default.writeFile(applicationPath, result, function (e) {
                    if (e) {
                        // tslint:disable-next-line:no-console
                        return console.log(err);
                    }
                });
            });
        });
    };
    return ElixirPlug;
}());
exports.default = ElixirPlug;
//# sourceMappingURL=elixir_plug.js.map