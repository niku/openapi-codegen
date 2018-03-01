import Handlebars from "handlebars";

export default class Generator {
  private readonly template: HandlebarsTemplateDelegate<any>;
  constructor() {
    this.template = Handlebars.compile(`defmodule {{moduleName}} do
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
end`);
  }

  public generate(obj: any): string {
    return this.template(obj);
  }
}
