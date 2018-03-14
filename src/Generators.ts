export default class Generators {
  private readonly type: string;
  private readonly outputPath: string;
  private readonly config: any;

  constructor(type: string, outputPath: string, config: any) {
    this.type = type;
    this.outputPath = outputPath;
    this.config = config;
  }

  public generate(openAPI: any): any {
    const modulePath = `./${this.type}`;
    import(modulePath)
      .then(({ default: module }) => {
        new module(this.outputPath, this.config).generate(openAPI);
      })
      // tslint:disable-next-line:no-console
      .catch(e => console.log(e));
  }
}
