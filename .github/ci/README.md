# Documentation checks

This private tooling package validates the public documentation in this repository.
It is not part of the Fajrix accounting application.

## Run locally

Use Node.js 24 and run these commands from the repository root:

```sh
npm ci --prefix .github/ci --ignore-scripts --no-audit --no-fund
npm test --prefix .github/ci
npm run check --prefix .github/ci
```

The checker reads tracked files and untracked files that Git does not ignore.
It does not modify documentation.

## Checks

- Markdown conventions using markdownlint. Long paragraphs and inline HTML are
  allowed, headings may end with punctuation, and an HTML banner may precede
  the first heading.
- Local Markdown links, reference links, images, and HTML `a[href]` and `img[src]`
  targets. Paths are matched case-sensitively, including on Windows.
- YAML 1.2 syntax, including duplicate mapping keys, across tracked YAML files.
- Tests that verify missing links, missing images and invalid YAML are rejected.

External URL availability, heading fragments, HTML `srcset`, factual accuracy,
licensing, accessibility beyond Markdown lint rules, and GitHub-specific YAML
schemas are not validated. Review those separately. Use relative links for
repository files; site-root links such as `/README.md` are rejected.

## Workflow and maintenance

The `Documentation` workflow runs on pull requests, pushes to `main`, and manual
dispatch. Its job is named `Documentation checks`. It runs for every pull request
without path filters so a future required check will not be left pending merely
because a change did not touch Markdown.

The workflow uses GitHub-hosted runners, read-only repository permissions and
GitHub-owned actions pinned to full commit SHAs. Checkout credentials are not
persisted. npm installs use the committed lockfile with lifecycle scripts disabled.
Node.js stays on major version 24 and receives patch updates.

Dependabot proposes weekly updates for the actions and this tooling package.
Review and merge those pull requests through the normal process; automatic merging
is not configured. The package is private and has no publication workflow.

Keep branch status requirements unchanged until this workflow has passed on
GitHub. Then use the actual reported check name when making it required.
