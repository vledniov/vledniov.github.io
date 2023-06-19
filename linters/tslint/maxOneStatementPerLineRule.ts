/* tslint:disable:source-file-name */
import * as Lint from "tslint/lib";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
  public static STATEMENT_FAILURE = "more then one statement per line";

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new MaxOneStatementsPerLineWalker(sourceFile, this.getOptions()));
  }
}

class MaxOneStatementsPerLineWalker extends Lint.RuleWalker {
  private _lastVisited: VisitedStatement;

  protected visitNode(node: ts.Node): void {
    if (this.isStatement(node)) {
      const visited = new VisitedStatement(node);
      if (this._lastVisited && this.isSameLine(visited)) {
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.STATEMENT_FAILURE));
      }
      this._lastVisited = visited;
    }

    super.visitNode(node);
  }

  private isSameLine(visited: VisitedStatement): boolean {
    return this._lastVisited.name === visited.name && this._lastVisited.end === visited.start;
  }

  private isStatement(node: ts.Node): boolean {
    switch (node.kind) {
      case ts.SyntaxKind.VariableStatement:
      case ts.SyntaxKind.EmptyStatement:
      case ts.SyntaxKind.ExpressionStatement:
      case ts.SyntaxKind.IfStatement:
      case ts.SyntaxKind.DoStatement:
      case ts.SyntaxKind.WhileStatement:
      case ts.SyntaxKind.ForStatement:
      case ts.SyntaxKind.ForInStatement:
      case ts.SyntaxKind.ForOfStatement:
      case ts.SyntaxKind.ContinueStatement:
      case ts.SyntaxKind.BreakStatement:
      case ts.SyntaxKind.ReturnStatement:
      case ts.SyntaxKind.WithStatement:
      case ts.SyntaxKind.SwitchStatement:
      case ts.SyntaxKind.LabeledStatement:
      case ts.SyntaxKind.ThrowStatement:
      case ts.SyntaxKind.TryStatement:
      case ts.SyntaxKind.DebuggerStatement:
      case ts.SyntaxKind.ImportDeclaration:
      case ts.SyntaxKind.ExportDeclaration:
        return true;
      default:
        return false;
    }
  }
}

class VisitedStatement {
  public name: string;
  public start: number;
  public end: number;

  constructor(node: ts.Node) {
    this.name = node.getSourceFile().fileName;
    this.start = node.getSourceFile().getLineAndCharacterOfPosition(node.getStart()).line;
    this.end = node.getSourceFile().getLineAndCharacterOfPosition(node.getEnd()).line;
  }
}
