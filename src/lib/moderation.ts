export type ModerationResult =
  | { allowed: true }
  | { allowed: false; reason: string };

const BAD_WORDS = [
  "suicide","self-harm","kill myself","terrorism","bomb","hate","slur",
  "sexual","porn","nsfw","explicit","violent","graphic","child","gore"
];

export function moderateTopic(raw: string): ModerationResult {
  const topic = raw.toLowerCase().trim();

  if (topic.length < 2) return { allowed: false, reason: "Topic too short." };
  if (topic.length > 120) return { allowed: false, reason: "Topic too long." };
  if (/\bhttps?:\/\//.test(topic)) return { allowed: false, reason: "URLs are not allowed." };
  if (/[<>]/.test(topic)) return { allowed: false, reason: "Potentially unsafe input." };

  if (BAD_WORDS.some(w => topic.includes(w))) {
    return { allowed: false, reason: "Topic flagged as sensitive/inappropriate." };
  }
  return { allowed: true };
}
