import CodeGeneratingUnitType from "./code_generating_unit_type";

export default class CodeGeneratingUnit {
  public readonly codeGeneratingUnitType: CodeGeneratingUnitType;
  constructor(codeGeneratingUnitType: CodeGeneratingUnitType) {
    this.codeGeneratingUnitType = codeGeneratingUnitType;
  }
}
