export default class Generators {
  private readonly moduleName: string;
  private readonly outputPath: string;
  private readonly config: any;

  constructor(moduleName: string, outputPath: string, config: any) {
    this.moduleName = moduleName;
    this.outputPath = outputPath;
    this.config = config;
  }

  public generate(openAPI: any): any {
    const modulePath = `./${this.moduleName}`;
    import(modulePath)
      .then(({ default: module }) => {
        new module(this.outputPath, this.config).generate(openAPI);
      })
      // tslint:disable-next-line:no-console
      .catch(e => console.log(e));
  }
}
