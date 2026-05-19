import * as vscode from 'vscode';

const COUNT_KEY = 'pronounce.speakCount';
const PROMPTED_KEY = 'pronounce.promptedMilestones';
const SILENCED_KEY = 'pronounce.silenced';
const REPO_URL = 'https://github.com/anzy-renlab-ai/pronounce';

// Milestones at which the star prompt fires (once each).
// Picked so engaged users see one prompt early, one after they're hooked, and
// one for super-users — but never spam.
const MILESTONES = [5, 30, 150];

/**
 * Increment the speak counter and, if we just hit a milestone, ask the user
 * to star the repo. No-op if the user has silenced future prompts.
 */
export async function recordSpeak(ctx: vscode.ExtensionContext): Promise<void> {
  if (ctx.globalState.get<boolean>(SILENCED_KEY)) return;
  const n = (ctx.globalState.get<number>(COUNT_KEY) ?? 0) + 1;
  await ctx.globalState.update(COUNT_KEY, n);
  if (!MILESTONES.includes(n)) return;
  const prompted = ctx.globalState.get<number[]>(PROMPTED_KEY) ?? [];
  if (prompted.includes(n)) return;
  await ctx.globalState.update(PROMPTED_KEY, [...prompted, n]);

  const star = '★ Star on GitHub';
  const later = 'Maybe later';
  const silence = "Don't ask again";
  const choice = await vscode.window.showInformationMessage(
    `Pronounce played ${n} words for you. A GitHub star keeps the dictionary growing — already 892 entries, every one with a citation.`,
    star,
    later,
    silence,
  );
  if (choice === star) {
    void vscode.env.openExternal(vscode.Uri.parse(REPO_URL));
  } else if (choice === silence) {
    await ctx.globalState.update(SILENCED_KEY, true);
  }
}
