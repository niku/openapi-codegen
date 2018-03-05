import CodeGeneratingConfig from "./code_generating_config";
import CodeGeneratingUnitType from "./code_generating_unit_type";

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
}
