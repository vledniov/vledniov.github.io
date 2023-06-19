/* tslint:disable:source-file-name */
import * as Lint from "tslint/lib";
import * as ts from "typescript";

const OPTION_SNAKECASE = "snakecase";

export class Rule extends Lint.Rules.AbstractRule {
  /* tslint:disable:object-literal-sort-keys */
  public static metadata: Lint.IRuleMetadata = {
    ruleName: "file-name",
    description: "Enforces file naming conventions.",
    rationale: "Helps ensure that file names follow a specified convention.",
    optionsDescription: Lint.Utils.dedent`
      A value of:
      * \`"snakecase"\` checks that file names are snakecased.`,
    options: {
      type: "array",
      items: {
        type: "string",
        enum: [
          "snakecase"
        ]
      },
      minLength: 0,
      maxLength: 1
    },
    optionExamples: ["snakecase"],
    type: "style",
    typescriptOnly: true
  };
  /* tslint:enable:object-literal-sort-keys */

  public static failureString(type: string, path: string): string {
    return `expected ${type} file name for file: ${path}`;
  }

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new SourceFileNameWalker(sourceFile, this.getOptions()));
  }
}

class SourceFileNameWalker extends Lint.RuleWalker {
  protected visitSourceFile(node: ts.SourceFile): void {
    if (this.hasOption(OPTION_SNAKECASE) && !this.isSourceFileNameSnakecase(node)) {
      const failureString = Rule.failureString(OPTION_SNAKECASE, node.fileName);
      this.addFailure(this.createFailure(node.getStart(), node.getWidth(), failureString));
    }

    super.visitSourceFile(node);
  }

  /**
   * Fails if the file name contains any uppercase letters.
   */
  private isSourceFileNameSnakecase(sourceFile: ts.SourceFile): boolean {
    const parts = sourceFile.fileName.split("/");
    const name = parts[parts.length - 1];
    return !/[A-Z]/.test(name);
  }
}
