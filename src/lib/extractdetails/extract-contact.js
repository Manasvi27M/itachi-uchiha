/**
 *
 *
 * returns an object:
 *   {
 *     name,
 *     phone,
 *     city,
 *     state,
 *     email,
 *     linkedIn,   // either a URL (if detected) or just the label "LinkedIn"
 *     github,     // either a URL (if detected) or just the label "GitHub"
 *     portfolio   // either a URL (if detected) or just the label "Portfolio"
 *   }
 */
export default function extractContactDetails(contactBlock = "") {
  // 1) Split on newline, trim out empty lines
  const contactLines = contactBlock
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  // 1.a) First non‐empty line is the name
  const name = contactLines[0] || "";

  // 1.b) Everything after the first line is typically pipe‐separated
  const rest = contactLines.slice(1).join("|");
  const parts = rest
    .split("|")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  // Prepare default values
  let phone = "";
  let city = "";
  let state = "";
  let email = "";
  let linkedIn = "";
  let github = "";
  let portfolio = "";

  // 2) Iterate each pipe‐section and classify
  parts.forEach((part) => {
    // 2.a) Email (simple regex)
    if (/[\w.+-]+@[\w-]+\.[\w.-]+/.test(part)) {
      email = part;
      return;
    }

    // 2.b) Phone (simple heuristic: starts with + or digit, length≥8)
    if (/^\+?\d[\d\s\-]{7,}\d$/.test(part)) {
      phone = part;
      return;
    }

    // 2.c) City, State (contains a comma, but no “@” or “http”)
    if (part.includes(",") && !part.includes("@") && !part.includes("http")) {
      const [c, s] = part.split(",").map((x) => x.trim());
      if (c && s) {
        city = c;
        state = s;
      }
      return;
    }

    // 2.d) LinkedIn (if a “linkedin.com/…” URL, or just the word “LinkedIn”)
    if (/linkedin\.com\/\w+/i.test(part)) {
      // if it already has “http…” prefix, keep it; otherwise prepend
      linkedIn = part.startsWith("http") ? part : `https://${part}`;
      return;
    }
    if (/^LinkedIn$/i.test(part)) {
      linkedIn = "LinkedIn";
      return;
    }

    // 2.e) GitHub (same logic: URL or just “GitHub”)
    if (/github\.com\/\w+/i.test(part)) {
      github = part.startsWith("http") ? part : `https://${part}`;
      return;
    }
    if (/^GitHub$/i.test(part)) {
      github = "GitHub";
      return;
    }

    // 2.f) Portfolio (could be a full URL or the literal “Portfolio” label)
    if (/^https?:\/\/.+/.test(part)) {
      // If part starts with http, assume it’s their Portfolio link
      portfolio = part;
      return;
    }
    if (/^Portfolio$/i.test(part)) {
      portfolio = "Portfolio";
      return;
    }
  });

  return {
    name,
    phone,
    city,
    state,
    email,
    linkedIn,
    github,
    portfolio,
  };
}
