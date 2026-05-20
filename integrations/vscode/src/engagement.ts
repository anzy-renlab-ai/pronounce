import * as vscode from 'vscode';
import { dictSize } from './dict';

const COUNT_KEY = 'pronounce.speakCount';
const PROMPTED_KEY = 'pronounce.promptedMilestones';
const SILENCED_KEY = 'pronounce.silenced';
const REPO_URL = 'https://github.com/anzy-renlab-ai/pronounce';
const KOFI_URL = 'https://ko-fi.com/alvinanziyan';

// Milestones at which the prompt fires (once each). Engaged users see one
// prompt early, one after they're hooked, and one for super-users.
const MILESTONES = [5, 30, 150];

/**
 * Increment the speak counter and, on milestone hits, offer two ways to
 * support — star (free) and Ko-fi (paid). No-op if user silenced.
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
  const coffee = '☕ Coffee (optional)';
  const silence = "Don't ask again";
  const size = dictSize(ctx.extensionPath);
  const choice = await vscode.window.showInformationMessage(
    `Pronounce played ${n} words for you. A GitHub star is the single best way to keep the dictionary growing — ${size} sourced entries and counting.`,
    star,
    coffee,
    silence,
  );
  if (choice === star) {
    void vscode.env.openExternal(vscode.Uri.parse(REPO_URL));
  } else if (choice === coffee) {
    void vscode.env.openExternal(vscode.Uri.parse(KOFI_URL));
  } else if (choice === silence) {
    await ctx.globalState.update(SILENCED_KEY, true);
  }
}
