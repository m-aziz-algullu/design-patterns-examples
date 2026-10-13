interface Command {
  execute(): () => void;
}

class TextDocument {
  private content = "";

  getContent(): string {
    return this.content;
  }

  setContent(content: string): void {
    this.content = content;
  }
}

class AppendTextCommand implements Command {
  constructor(
    private readonly document: TextDocument,
    private readonly text: string
  ) {}

  execute(): () => void {
    const previousContent = this.document.getContent();

    this.document.setContent(previousContent + this.text);

    // Each execution returns its own undo action, preserving the prior content.
    return () => {
      this.document.setContent(previousContent);
    };
  }
}

class CommandHistory {
  private readonly undoActions: Array<() => void> = [];

  execute(command: Command): void {
    const undo = command.execute();

    this.undoActions.push(undo);
  }

  undo(): void {
    const undo = this.undoActions.pop();

    if (undo) {
      undo();
    }
  }
}

function runCommandDemo(): void {
  const document = new TextDocument();
  const history = new CommandHistory();

  history.execute(new AppendTextCommand(document, "Hello"));
  history.execute(new AppendTextCommand(document, ", world!"));

  console.log("After commands:", document.getContent());

  history.undo();

  console.log("After undo:", document.getContent());

  history.undo();

  console.log("After undoing all commands:", JSON.stringify(document.getContent()));

  history.undo();

  console.log("Undo with empty history:", JSON.stringify(document.getContent()));
}

runCommandDemo();
