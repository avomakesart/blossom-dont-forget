# Blossom Don't Forget

Blossom Don't Forget is a personal project created to help my team and me remember important checks before pushing code. This VS Code extension provides a handy checklist and reminders to ensure we maintain high code quality standards in our collaborative work.

## Features

This extension offers the following features to improve our code push process:

1. **Pre-Push Checklist**: A comprehensive list of items to check before pushing code.
   ![Pre-Push Checklist](images/checklist.png)

2. **Status Bar Reminder**: A visible reminder in the VS Code status bar when there are unpushed commits.
   ![Status Bar Reminder](images/status-bar.png)

3. **Push Confirmation**: A dialog that prompts you to review the checklist before pushing.
   ![Push Confirmation](images/push-confirmation.png)

## How It Works

1. When you have unpushed commits, a status bar item will appear.
2. Clicking the status bar item or attempting to push will show the Pre-Push Checklist.
3. The checklist reminds you of important tasks like running tests, updating documentation, and checking for sensitive information.
4. You can choose to view the checklist or proceed with the push.

## Installation

1. Open VS Code
2. Go to the Extensions view (Ctrl+Shift+X)
3. Search for "Blossom Don't Forget"
4. Click Install

## Usage

The extension activates automatically in any VS Code workspace. Just work on your code as usual, and the extension will remind you when it's time to review the checklist.

## Customization

While this extension is primarily for personal and team use, you can modify the checklist items in the `src/extension.ts` file if you want to adapt it to your team's specific needs.

## Known Issues

Currently, there are no known issues. If you encounter any problems, please let me know!

## Release Notes

### 1.0.0

Initial release of Blossom Don't Forget

- Added Pre-Push Checklist
- Implemented Status Bar Reminder
- Added Push Confirmation dialog

---

This extension is a personal project created to improve our team's code quality and consistency. It's not intended for wide distribution but rather as a helpful tool for our specific workflow. Feel free to suggest any improvements or customizations that could benefit our team!

**Happy coding, and don't forget to check before you push!**