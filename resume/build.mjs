// Renders resume/resume.html to public/Yuvraj_Singh_Shekhawat_Resume.pdf (needs Playwright: npx playwright install chromium)
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("file://" + path.join(dir, "resume.html"));
await page.pdf({ path: path.join(dir, "..", "public", "Yuvraj_Singh_Shekhawat_Resume.pdf"), format: "A4", printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log("wrote public/Yuvraj_Singh_Shekhawat_Resume.pdf");
