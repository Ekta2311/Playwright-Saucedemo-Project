# Sauce Demo Tests

This project tests the checkout flow on [Sauce Demo](https://www.saucedemo.com/) using
Playwright, TypeScript, and Cucumber.

## Setup

Install Node.js 20 or 22, then run:

```bash
npm ci
npx playwright install chromium
```

## Run Tests

```bash
npm test
```

This command creates a saved login session and runs the Cucumber tests. The session is
stored in `playwright/.auth/` and is ignored by Git.

Optional checks and report generation:

```bash
npx eslint .
npx tsc --noEmit
node scripts/generate-report.cjs
```

Run the report command after `npm test` to create `reports/cucumber-report.html` from
the Cucumber JSON report.

## Project Files

Gherkin scenarios are in `features/checkout.feature`; their TypeScript steps are in
`features/step-definitions/`. The `pages/` folder contains page objects for login,
products, cart, and checkout. `features/support/` sets up each browser context and saves
screenshots and traces for failed scenarios. `tests/auth.setup.spec.ts` creates the
saved login session. Manual test cases are in `saucedemo-test-cases.md`, and the defect
report is in `BUGS.md`.

## Design

Cucumber makes the checkout steps readable, and page objects keep shared page actions
in one place. The purchase scenario logs in through the UI; the other authenticated
scenarios reuse saved browser state. The project currently runs on Chromium.

## Known Issues

- The `@BUG-001` test is expected to fail while Sauce Demo allows an order to be
  completed with an empty cart. The failure confirms the reported application defect.
- The GitHub Actions workflow refers to npm scripts that are not currently defined in
  `package.json`. Update the workflow or add the missing scripts before relying on CI.
- Complete the manual exploratory-session details and test execution results in the QA
  documents before submitting them.
- Firefox and WebKit are not configured.
