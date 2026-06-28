import * as vscode from 'vscode';
import { dictSize } from './dict';

const COUNT_KEY = 'pronounce.speakCount';
const PROMPTED_KEY = 'pronounce.promptedMilestones';
const SILENCED_KEY = 'pronounce.silenced';
const REPO_URL = 'https://github.com/anzy-renlab-ai/pronounce';
const KOFI_URL = 'https://ko-fi.com/alvinanziyan';

// Milestones at which the prompt fires (once each). The first fires EARLY —
// most installs never reach the old "5" (cumulative downloads ≫ active users),
// and a user who has heard 3 words has already received the value. The first
// touch is the highest-leverage impression, so it shows ONLY the free star
// (no competing Ko-fi button). Later milestones re-ask hooked / super-users.
const MILESTONES = [3, 20, 80];

// ?ref marker so repo arrivals from the extension are attributable when we
// look at where stars come from (the usage→repo-visit gap is the whole game).
const STAR_URL = `${REPO_URL}?ref=vscode-prompt`;

/**
 * Increment the speak counter and, on milestone hits, ask for a GitHub star
 * (free) — the first prompt is star-only; later ones also offer Ko-fi (paid).
 * No-op if the user silenced.
 */
export async function recordSpeak(ctx: vscode.ExtensionContext): Promise<void> {
  if (ctx.globalState.get<boolean>(SILENCED_KEY)) return;
  const n = (ctx.globalState.get<number>(COUNT_KEY) ?? 0) + 1;
  await ctx.globalState.update(COUNT_KEY, n);
  if (!MILESTONES.includes(n)) return;
  const prompted = ctx.globalState.get<number[]>(PROMPTED_KEY) ?? [];
  if (prompted.includes(n)) return;
  await ctx.globalState.update(PROMPTED_KEY, [...prompted, n]);

  const star = vscode.l10n.t('★ Star on GitHub');
  const coffee = vscode.l10n.t('☕ Coffee (optional)');
  const silence = vscode.l10n.t("Don't ask again");
  const size = dictSize(ctx.extensionPath);
  const isFirst = n === MILESTONES[0];

  const message = isFirst
    ? vscode.l10n.t('Hope Pronounce just saved you a mispronunciation. A free GitHub star keeps this {0}-entry sourced dictionary growing — that’s the whole ask.', size)
    : vscode.l10n.t('Pronounce played {0} words for you. A GitHub star is the single best way to keep the dictionary growing — {1} sourced entries and counting.', n, size);
  // First touch: star is the SOLE call to action (Ko-fi would compete with it).
  const actions = isFirst ? [star, silence] : [star, coffee, silence];

  const choice = await vscode.window.showInformationMessage(message, ...actions);
  if (choice === star) {
    void vscode.env.openExternal(vscode.Uri.parse(STAR_URL));
  } else if (choice === coffee) {
    void vscode.env.openExternal(vscode.Uri.parse(KOFI_URL));
  } else if (choice === silence) {
    await ctx.globalState.update(SILENCED_KEY, true);
  }
}
