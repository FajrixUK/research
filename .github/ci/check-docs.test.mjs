import assert from "node:assert/strict";
import test from "node:test";
import { localLinkErrors, yamlErrors } from "./check-docs.mjs";

const files = ["README.md", "guide/page.md", "assets/banner.png", "assets/file name.png"];

test("Markdown, reference links, encoded paths and HTML images resolve", () => {
  const content = '[Guide](guide/page.md#heading)\n\n[Reference][guide]\n\n[guide]: guide/page.md\n\n<img src="assets/banner.png" alt="Banner">\n\n![File](assets/file%20name.png)';
  assert.deepEqual(localLinkErrors(content, "README.md", files), []);
});

test("missing targets and case mismatches fail", () => {
  assert.equal(localLinkErrors('[Bad](missing.md)\n\n![Bad](assets/Banner.png)', "README.md", files).length, 2);
});

test("a missing HTML banner fails", () => {
  assert.equal(localLinkErrors('<img src="assets/missing.png" alt="Banner">', "README.md", files).length, 1);
});

test("nested paths and directory links resolve", () => {
  assert.deepEqual(localLinkErrors('[Home](../README.md)\n\n[Assets](../assets/)', "guide/page.md", files), []);
});

test("remote URLs, mail links and code examples are not local targets", () => {
  const content = '[Remote](https://example.invalid) [Mail](mailto:info@example.invalid) [Anchor](#section)\n\n`[Example](missing.md)`\n\n```md\n![Example](missing.png)\n```';
  assert.deepEqual(localLinkErrors(content, "README.md", files), []);
});

test("escaping repository paths and site-root paths fail", () => {
  assert.equal(localLinkErrors('[Escape](../outside.md) [Root](/README.md)', "README.md", files).length, 2);
});

test("YAML 1.2 accepts workflow on keys and rejects duplicate keys", () => {
  assert.deepEqual(yamlErrors('on:\n  pull_request:\npermissions:\n  contents: read\n'), []);
  assert.ok(yamlErrors('name: First\nname: Second\n').length > 0);
});

test("malformed YAML fails", () => {
  assert.ok(yamlErrors('body: [\n').length > 0);
});
