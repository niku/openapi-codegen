import yaml from "js-yaml";

export default class Loader {
  public readonly load: (str: string) => any;
  constructor(load = yaml.safeLoad) {
    this.load = load;
  }
}
