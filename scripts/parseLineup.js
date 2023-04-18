const lineupUrl = "https://www.lostinstpete.org/full-lineup";
import { parse } from "node-html-parser";

async function run() {
  const response = await fetch(lineupUrl);
  const text = await response.text();
  const root = parse(text);
  const h3Tags = root.querySelectorAll("h3");
  h3Tags.forEach((h3) => {
    const aTags = h3.querySelectorAll("a");
    const a = aTags[aTags.length - 1];
    if (a) {
      const href = a.getAttribute("href");
      const text = a.textContent.trim();
      if (href.startsWith("/")) {
        console.log(`${text},https://www.lostinstpete.org${href}`);
      }
    }
  });
}

run();
