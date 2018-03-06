import CodeGeneratingConfig from "./code_generating_config";
import CodeGeneratingUnitType from "./code_generating_unit_type";
import Generator from "./generator";

export default class CodeGeneratingUnit {
  public readonly codeGeneratingConfig: CodeGeneratingConfig;
  public readonly codeGeneratingUnitType: CodeGeneratingUnitType;
  constructor(
    codeGeneratingUnitType: CodeGeneratingUnitType,
    codeGeneratingConfig: CodeGeneratingConfig
  ) {
    this.codeGeneratingUnitType = codeGeneratingUnitType;
    this.codeGeneratingConfig = codeGeneratingConfig;
  }

  public generate(openAPI: any): any {
    const moduleName = this.codeGeneratingConfig.config.moduleName;
    return new Generator().generate({
      moduleName,
      openAPI
    });
  }
}
