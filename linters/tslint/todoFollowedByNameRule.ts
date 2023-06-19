/* tslint:disable:source-file-name */
import * as Lint from "tslint/lib";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
  public static FORMAT_FAILURE = "TODOs must be in the format // TODO(lower_case_name): message";
  public static MULTILINE_COMMENT_FAILURE = "use single line comments for TODO messages";

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new TodoFollowedByNameWalker(sourceFile, this.getOptions()));
  }
}

class TodoFollowedByNameWalker extends Lint.RuleWalker {
  public visitSourceFile(node: ts.SourceFile): void {
    super.visitSourceFile(node);

    Lint.forEachComment(node, (fullText, _kind, pos) => {
      const commentText = fullText.substr(pos.tokenStart, pos.end - pos.tokenStart);
      if (_kind === ts.SyntaxKind.SingleLineCommentTrivia) {
        const width = commentText.length - 2;

        if (commentText.match(/todo/i)) {
          if (!commentText.match(/\/\/ TODO\([a-z]+\): .+/)) {
            this.addFailure(this.createFailure(pos.tokenStart, width, Rule.FORMAT_FAILURE));
          }
        }
      }
      if (_kind === ts.SyntaxKind.MultiLineCommentTrivia) {
        const width = commentText.length - 2;
        if (commentText.match(/todo/i)) {
          this.addFailure(this.createFailure(pos.tokenStart, width, Rule.MULTILINE_COMMENT_FAILURE));
        }
      }
    });
  }
}
