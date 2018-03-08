import Handlebars from "handlebars";

export default class Generator {
  private readonly template: HandlebarsTemplateDelegate<any>;
  constructor(template: string) {
    this.template = Handlebars.compile(template);
  }

  public generate(obj: any): string {
    return this.template(obj);
  }
}
