import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import MarkdownIt from "markdown-it";
import { Parser } from "htmlparser2";
import { parseAllDocuments } from "yaml";
import { lint } from "markdownlint/promise";

const toolDirectory = path.dirname(fileURLToPath(import.meta.url));
const markdown = new MarkdownIt({ html: true });

// Render with a Markdown parser so reference links and HTML images are covered,
// while link-shaped text inside code examples is ignored.
export function localLinkErrors(source, documentPath, repositoryPaths) {
  const errors = [];
  const targets = new Set(repositoryPaths);
  for (const entry of repositoryPaths) {
    let directory = path.posix.dirname(entry);
    while (directory !== ".") {
      targets.add(directory);
      directory = path.posix.dirname(directory);
    }
  }
  targets.add(".");
  function checkTarget(value) {
    if (!value || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value)) return;
    // Fragment/heading validation and remote URL availability are out of scope.
    const pathname = value.split(/[?#]/, 1)[0];
    if (!pathname) return;
    let decoded;
    try {
      decoded = decodeURIComponent(pathname);
    } catch {
      errors.push(`Invalid URL encoding: ${value}`);
      return;
    }
    if (decoded.includes("\\") || decoded.includes("\0")) {
      errors.push(`Invalid local URL path: ${value}`);
      return;
    }
    if (decoded.startsWith("/")) {
      errors.push(`Use a relative repository link instead of a site-root URL: ${value}`);
      return;
    }
    const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(documentPath), decoded))
      .replace(/\/$/, "");
    if (resolved === ".." || resolved.startsWith("../") || !targets.has(resolved)) {
      errors.push(`Missing local target (case-sensitive): ${value}`);
    }
  }
  const parser = new Parser({
    onopentag(name, attributes) {
      if (name === "a" && attributes.href !== undefined) checkTarget(attributes.href);
      if (name === "img" && attributes.src !== undefined) checkTarget(attributes.src);
    }
  }, { decodeEntities: true });
  parser.end(markdown.render(source));
  return errors;
}

export function yamlErrors(source) {
  return parseAllDocuments(source, { uniqueKeys: true, version: "1.2" })
    .flatMap(document => [...document.errors, ...document.warnings])
    .map(error => error.message);
}

export async function checkRepository(root) {
  // Untracked, non-ignored files are included for local checks before staging.
  const paths = [...new Set(execFileSync("git", [
    "ls-files", "--cached", "--others", "--exclude-standard", "-z"
  ], { cwd: root, encoding: "utf8" }).split("\0").filter(Boolean))].sort();
  const markdownPaths = paths.filter(file => /\.md$/i.test(file));
  const yamlPaths = paths.filter(file => /\.ya?ml$/i.test(file));
  const errors = [];
  const strings = Object.fromEntries(markdownPaths.map(file => [file,
    readFileSync(path.join(root, file), "utf8")
  ]));
  const config = JSON.parse(readFileSync(path.join(toolDirectory, "markdownlint.json"), "utf8"));
  const results = await lint({ strings, config });
  for (const [file, findings] of Object.entries(results)) {
    for (const finding of findings) {
      errors.push(`${file}:${finding.lineNumber}: ${finding.ruleNames[0]} ${finding.ruleDescription}${finding.errorDetail ? ` (${finding.errorDetail})` : ""}`);
    }
  }
  for (const [file, content] of Object.entries(strings)) {
    for (const error of localLinkErrors(content, file, paths)) errors.push(`${file}: ${error}`);
  }
  for (const file of yamlPaths) {
    for (const error of yamlErrors(readFileSync(path.join(root, file), "utf8"))) {
      errors.push(`${file}: ${error}`);
    }
  }
  return { errors, markdownCount: markdownPaths.length, yamlCount: yamlPaths.length };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const root = path.resolve(toolDirectory, "../..");
  try {
    const result = await checkRepository(root);
    for (const error of result.errors) console.error(error);
    console.log(`Checked ${result.markdownCount} Markdown and ${result.yamlCount} YAML files; ${result.errors.length} error(s).`);
    if (result.errors.length) process.exitCode = 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
