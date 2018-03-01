"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = __importDefault(require("handlebars"));
var Generator = /** @class */ (function () {
    function Generator() {
        this.template = handlebars_1.default.compile("defmodule {{moduleName}} do\n  use Plug.Router\n\n  plug :match\n  plug :dispatch\n\n  {{#each openAPI.paths}}\n    {{#each this}}\n      {{#x-elixir-plug-code}}\n  {{@key}} \"{{@../key}}\" do\n    {{{this}}}\n  end\n\n      {{/x-elixir-plug-code}}\n      {{^x-elixir-plug-code}}\n        {{#each responses}}\n          {{#each content}}\n  {{@../../key}} \"{{@../../../key}}\" do\n    send_resp(conn, {{@../key}}, \"{{example}}\")\n  end\n\n          {{/each}}\n        {{/each}}\n      {{/x-elixir-plug-code}}\n    {{/each}}\n  {{/each}}\n  match _ do\n    send_resp(conn, 404, \"oops\")\n  end\nend");
    }
    Generator.prototype.generate = function (obj) {
        return this.template(obj);
    };
    return Generator;
}());
exports.default = Generator;
//# sourceMappingURL=generator.js.map