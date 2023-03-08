const vscode = require("vscode");
const data = require("./data");

function greetEveryoneOnActivation() {
  vscode.window.showInformationMessage("👋🏼 Hello Stitchies! 🎉");
}

/**
 * @returns {vscode.Disposable} Represents a type which can release resources, such as event listening or a timer.
 */
const registerSearchGuidelinesCommand = (guidelines) => {
  const disposableCmd = vscode.commands.registerCommand(
    "hatch-ext.searchGuidelines",
    async function () {
      const guideline = await vscode.window.showQuickPick(guidelines, {
        matchOnDetail: false,
      });

      if (!guideline) return;

      vscode.env.openExternal(guideline.link);
    }
  );
  return disposableCmd;
};

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  greetEveryoneOnActivation();

  const disposable = registerSearchGuidelinesCommand(data);

  context.subscriptions.push(disposable);
}

exports.activate = activate;

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
