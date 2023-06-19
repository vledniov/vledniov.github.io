/* tslint:disable:source-file-name */
import * as Lint from "tslint/lib";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = "Capitalize acronyms and abbreviations, i.e Html instead of HTML";

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new AcWalker(sourceFile, this.getOptions()));
  }
}

class AcWalker extends Lint.RuleWalker {
  public visitIdentifier(node: ts.Identifier): void {
    const lintedDeclarationTypes = [
      ts.SyntaxKind.ClassDeclaration,
      ts.SyntaxKind.InterfaceDeclaration,
      ts.SyntaxKind.EnumDeclaration,
      ts.SyntaxKind.TypeAliasDeclaration
    ];

    // At least 3 capital letters in a row, so IFileInputProps is still good.
    const regex = /[A-Z]{3,}/;

    if (node.parent && lintedDeclarationTypes.indexOf(node.parent.kind) > -1) {
      if (regex.test(node.getText())) {
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
      }
    }

    super.visitIdentifier(node);
  }
}
