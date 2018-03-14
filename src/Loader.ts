import yaml from "js-yaml";

export default class Loader {
  private readonly loader: typeof yaml;

  constructor(loader = yaml) {
    this.loader = loader;
  }

  public safeLoad(str: string, opts?: yaml.LoadOptions): any {
    return this.loader.safeLoad(str, opts);
  }
}
