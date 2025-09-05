export type ModerationResult =
  | { allowed: true }
  | { allowed: false; reason: string };

const BAD_WORDS = [
  // Violence & Harm
  "suicide", "self-harm", "kill myself", "terrorism", "bomb", "weapon", "gun", "knife", "murder", 
  "assault", "violence", "violent", "torture", "abuse", "domestic violence", "school shooting",
  "mass shooting", "genocide", "war crimes", "execution", "assassination",

  // Sexual Content
  "sexual", "porn", "pornography", "nsfw", "explicit", "nude", "naked", "sex", "intercourse",
  "masturbation", "orgasm", "penis", "vagina", "breast", "genital", "erotic", "fetish",
  "prostitution", "escort", "brothel", "strip club", "adult content",

  // Hate Speech & Discrimination  
  "hate", "slur", "racist", "racism", "nazi", "fascist", "bigot", "homophobic", "transphobic",
  "islamophobic", "antisemitic", "xenophobic", "supremacist", "kkk", "white power",

  // Drugs & Illegal Activities
  "drug", "cocaine", "heroin", "meth", "cannabis", "marijuana", "weed", "lsd", "ecstasy",
  "drug dealing", "drug trafficking", "illegal drugs", "substance abuse", "overdose",
  "money laundering", "fraud", "scam", "hacking", "identity theft",

  // Graphic Content
  "gore", "graphic", "dismember", "decapitation", "mutilation", "corpse", "dead body",
  "blood", "injury", "wound", "cutting", "self-cutting", "self-injury",

  // Inappropriate for Children
  "child", "minor", "underage", "pedophile", "child abuse", "child exploitation",
  "grooming", "predator",

  // Mental Health Crisis Terms
  "want to die", "end it all", "no point living", "kill me", "suicide methods",
  "how to die", "painless death", "suicide note",

  // Offensive Slurs (partial list - add more as needed)
  "nigger", "faggot", "retard", "spastic", "cripple", "midget", "tranny",

  // Other Inappropriate
  "incest", "bestiality", "necrophilia", "rape", "sexual assault", "molest",
  "human trafficking", "slavery", "child labor"
];

export function moderateTopic(raw: string): ModerationResult {
  const topic = raw.toLowerCase().trim();

  // Basic validation checks
  if (topic.length < 2) return { allowed: false, reason: "Topic too short." };
  if (topic.length > 120) return { allowed: false, reason: "Topic too long." };
  if (/\bhttps?:\/\//.test(topic)) return { allowed: false, reason: "URLs are not allowed." };
  if (/[<>]/.test(topic)) return { allowed: false, reason: "Potentially unsafe input." };

  // Check for inappropriate words
  if (BAD_WORDS.some(badWord => topic.includes(badWord))) {
    return { allowed: false, reason: "Inappropriate content detected." };
  }

  // Additional pattern-based checks
  if (/\b(how to (kill|hurt|harm|die|suicide))\b/.test(topic)) {
    return { allowed: false, reason: "Harmful content not allowed." };
  }

  if (/\b(i want to (die|kill myself|end it all))\b/.test(topic)) {
    return { allowed: false, reason: "Crisis content detected. Please seek help." };
  }

  // Check for repeated characters (spam-like behavior)
  if (/(.)\1{10,}/.test(topic)) {
    return { allowed: false, reason: "Invalid input format." };
  }

  return { allowed: true };
}
