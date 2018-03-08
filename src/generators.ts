import ElixirPlug from "./elixir_plug";
import Generator from "./generator";

export default class Generators {
  private readonly type: string;
  private readonly config: any;

  constructor(type: string, config: any) {
    this.type = type;
    this.config = config;
  }

  public generate(openAPI: any): any {
    new ElixirPlug(this.config).generate(openAPI);
  }
}
