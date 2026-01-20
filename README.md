# ng-autosize-demo (demo for `ng-autosize`)

This repository is a **demo app for the `ng-autosize` project**: an Angular textarea autosize (“elastic height”) directive.

- `ng-autosize` on GitHub: https://github.com/stevepapa/ng-autosize
- `ng-autosize` on npm: https://www.npmjs.com/package/ng-autosize

This demo shows how `ng-autosize` behaves in a modern Angular (v19) app: the textarea grows with content, supports `minHeight` / `maxHeight`, and includes a `refresh()` pattern for programmatic updates.

## What you get

- **Autosize on typing** (no manual sizing)
- **Min/Max height constraints** (`[minHeight]` / `[maxHeight]` in px)
- **Programmatic updates** pattern: set value then call `refresh()`
- **Standalone directive** usage (no NgModule required)

Note: this repo vendors a small autosize directive in `src/app/autosize.directive.ts` to keep the demo buildable; the canonical library is `ng-autosize` linked above.

## Quick start

```bash
npm install
npm start
```

Open `http://localhost:4200/`.

## Build + test

```bash
npm run build
npm test -- --watch=false --browsers=ChromeHeadless
```

To preview the production build output, serve `dist/temp-ng19/browser` with any static server.

## Demo usage

In a template:

- Add `autosize` to a `<textarea>`
- Optionally set `[minHeight]` and/or `[maxHeight]`
- Use `#ref="autosize"` to call `ref.refresh()` after programmatic changes

## Publishing

This repo is configured to publish to npm on tags like `v2.0.0` via `.github/workflows/release.yml` (requires `NPM_TOKEN` GitHub secret).
