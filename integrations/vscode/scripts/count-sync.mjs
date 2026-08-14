// Pure count-copy synchronizer shared by the dictionary builder and tests.
// Each pattern is semantic: totals, source coverage, and creator confirmation
// must never overwrite one another merely because they share a counter word.

const TOTAL_PROSE = /\b(\d{1,3}(?:,\d{3})+|\d{3,5})(\+?)((?:[ \-]confidence[ \-]tagged)?[ \-](?:entr(?:y|ies)|(?:developer[ \-]jargon|tech|project, product, and programmer[ \-]jargon)\s+names))/gi;
const SOURCE_PROSE = /\b(\d{1,3}(?:,\d{3})+|\d{3,5})(?=(?:(?: also)? (?:(?:carry|have|with) (?:a )?citable sources?|sourced entr(?:y|ies))| of (?:\d{1,3}(?:,\d{3})+|\d{3,5}) entr(?:y|ies) (?:carry|have|with) (?:a )?citable sources?))/gi;
const CREATOR_PROSE = /\b(\d{2,4})(?= (?:settled by the creator|creator-clarified entr(?:y|ies)))/gi;
const CONTESTED_PROSE = /\b(\d{2,4})(?= (?:the community still argues|contested entr(?:y|ies)))/gi;
const BADGE = /\b\d{3,4}(?:%2B)?%20entries/gi;
const CJK_TOTAL = /\d{3,4}(?=\s*条(?:(?:发音|社区维护))?词条)/g;
const CJK_SOURCE = /\d{3,4}(?=\s*条带来源(?:引用)?)/g;
const CJK_CREATOR = /\d{2,4}(?=\s*条为作者确认)/g;

function formattedCount(value, matchedNumber) {
  return matchedNumber.includes(',')
    ? value.toLocaleString('en-US')
    : `${value}`;
}

export function syncCountText(
  text,
  { count, sourceCount, creatorCount, contestedCount },
) {
  return text
    .replace(TOTAL_PROSE, (_match, number, plus, tail) =>
      `${formattedCount(count, number)}${plus}${tail}`)
    .replace(SOURCE_PROSE, number => formattedCount(sourceCount, number))
    .replace(CREATOR_PROSE, number => formattedCount(creatorCount, number))
    .replace(CONTESTED_PROSE, number => formattedCount(contestedCount, number))
    .replace(BADGE, `${count}%20entries`)
    .replace(CJK_TOTAL, `${count}`)
    .replace(CJK_SOURCE, `${sourceCount}`)
    .replace(CJK_CREATOR, `${creatorCount}`);
}
