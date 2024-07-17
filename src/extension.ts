import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
    // Create a status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.text = "$(arrow-up) Pre-Push Checklist";
    statusBarItem.command = 'extension.showPrePushChecklist';
    context.subscriptions.push(statusBarItem);

    // Register the command to show the checklist
    let showChecklistDisposable = vscode.commands.registerCommand('extension.showPrePushChecklist', showChecklist);
    context.subscriptions.push(showChecklistDisposable);

    // Register the command to intercept git push
    let interceptPushDisposable = vscode.commands.registerCommand('git.push', interceptGitPush);
    context.subscriptions.push(interceptPushDisposable);

    // Listen for Git repository changes
    if (vscode.extensions.getExtension('vscode.git')) {
        const gitExtension = vscode.extensions.getExtension('vscode.git')?.exports;
        const git = gitExtension.getAPI(1);

        git.onDidChangeState(() => {
            checkGitStatus(git);
        });

        // Initial check
        checkGitStatus(git);
    }
}

function checkGitStatus(git: any) {
    const repo = git.repositories[0];
    if (repo) {
        repo.state.onDidChange(() => {
            if (repo.state.HEAD && repo.state.HEAD.ahead > 0) {
                statusBarItem.show();
            } else {
                statusBarItem.hide();
            }
        });
    }
}

async function interceptGitPush() {
    const answer = await vscode.window.showInformationMessage(
        'Have you reviewed the Pre-Push Checklist?',
        'Yes, Push',
        'Show Checklist'
    );

    if (answer === 'Show Checklist') {
        showChecklist();
    } else if (answer === 'Yes, Push') {
        vscode.commands.executeCommand('git.push');
    }
}

function showChecklist() {
    const panel = vscode.window.createWebviewPanel(
        'prePushChecklist',
        'Pre-Push Checklist',
        vscode.ViewColumn.One,
        {}
    );

    panel.webview.html = getWebviewContent();
}

function getWebviewContent() {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pre-Push Checklist</title>
    </head>
    <body>
        <h1>Pre-Push Checklist</h1>
   <p>Make sure to follow these steps before you click on the merge button, we know that you are excited to merge your things, but let’s be safe first.</p>
<p><strong>Mobile:</strong>
Make sure to verify your feature on the app and mobile browser </p>
<ul>
<li>[ ]  Check on Android</li>
<li>[ ]  Check on IOS</li>
<li>[ ]  Check on mobile browser</li>
</ul>
<p><strong>Unit test:</strong></p>
<p>Make sure to add proper unit tests to your feature.</p>
<ul>
<li>[ ]  Add tests to your feature thinking about the customer actions.
ex.clicks, hovers, focus, etc.</li>
<li>[ ]  If there are more variants make sure to cover all of them.</li>
<li>[ ]  Make sure to verify a11y and (if necessary) add a11y tests.</li>
</ul>
<p><strong>Cross browser test:</strong></p>
<p>Sometimes browsers act different, and customers can have a different browser than you, so make sure to tests your features on the most common browsers.</p>
<ul>
<li>[ ]  Firefox</li>
<li>[ ]  Chrome</li>
<li>[ ]  Safari (if needed)</li>
</ul>
<p><strong>Different accounts:</strong></p>
<p>If you think is necessary to verify, make sure to login into a business account and test your feature.</p>
<p>You can use these regular accounts for tests:</p>
<ul>
<li>[ ]  Check with Business Account</li>
</ul>
<p><strong>Translations</strong></p>
<p>Our texts needs to be translated so follow these steps.</p>
<ul>
<li>[ ]  Add texts to rosetta (stg and pro)</li>
<li>[ ]  Request translations to french.</li>
</ul>
<p><strong>Mock data:</strong></p>
<p>We have generated mock data based on rosetta texts, but sometimes we need different edge cases, and the generated texts is not the best option, so make sure to follow these steps.</p>
<ul>
<li>[ ]  Verify long texts (ex. product names, partner names)</li>
<li>[ ]  Verify special texts (ex. dynamic data)</li>
</ul>
<p><strong>Happy flows:</strong></p>
<p>Make sure to execute your whole flow, doing manual tests, like what happens if we have an error, what happen if we don’t have data, or maybe we have a slow connection:</p>
<ul>
<li>[ ]  Check what happens if error occured</li>
<li>[ ]  Check what happens if data isn&#39;t there (empy states?)</li>
<li>[ ]  Check what happen if we have slow connection.</li>
<li>[ ]  Check with long status/messages/names</li>
<li>[ ]  Double check by other frontend on feature env.</li>
<li>[ ]  Verify the story of your feature and make sure it is aligned, if something is not covered check with the reporter.</li>
<li>[ ]  Check if is necessary to add cypress tests (this can also be in a separate story).</li>
</ul>
<p><strong>After merging:</strong>
You are done but sort of, your MR is merged but it is important to keep an eye on your feature, so follow these steps to make sure all is good:</p>
<p><em>**</em>For performance you can open you dev tools and click on the profiler, if you need assistance contact your favorite frontender. </p>
<hr>
<ul>
<li>[ ]  Check logs</li>
<li>[ ]  Check performance</li>
<li>[ ]  Check translations and make sure that your feature looks good on both languages, if not check with your favorite designer for the best option.</li>
<li>[ ]  Verify that tagging it is correct on stg and pro, and double check with your favorite business person. (optional)</li>
<li>[ ]  Checked with design before going to PRO</li>
</ul>

    </body>
    </html>`;
}

export function deactivate() {}

export { showChecklist, getWebviewContent, checkGitStatus, interceptGitPush };