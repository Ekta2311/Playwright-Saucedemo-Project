tagged `@authenticated`, and captures screenshots and traces for failed scenarios.

# Sauce Demo Checkout Tests

Playwright, TypeScript, and Cucumber BDD tests for the public Sauce Demo storefront at
https://www.saucedemo.com/.

## Requirements

- Node.js 20 or 22
- npm
- Git

## Install

```bash
npm ci
npx playwright install chromium
```

On Linux CI, install Chromium and its system dependencies with
`npx playwright install --with-deps chromium`.

## Run

```bash
npm test                 # Create saved login state, then run the Cucumber suite
npm run test:headed       # Run the Cucumber suite with a visible Chromium window
npm run test:ui           # Open Playwright UI for the authentication setup spec
npm run test:report       # Generate HTML from reports/cucumber-report.json
npm run lint              # Run ESLint
npm run typecheck         # Run the strict TypeScript check
npm run format            # Format files with Prettier
```

`npm test` first runs `tests/auth.setup.spec.ts`, which saves browser storage under
`playwright/.auth/`, then runs the Gherkin scenarios. The authentication state is local,
generated on demand, and ignored by Git. The Cucumber HTML report is generated after
the suite with `npm run test:report`; the JSON input is written to `reports/`.

The suite currently contains a BUG-001 regression scenario that intentionally fails
while Sauce Demo allows checkout completion with an empty cart. This is a confirmed
application defect, not a framework failure; `npm test` therefore exits non-zero until
the defect is fixed. The test report records the failure.

## Project structure

`features/` contains the checkout Gherkin scenarios and their TypeScript step
definitions. `pages/` holds Page Object Model classes for login, inventory, cart, and
checkout. `features/support/` creates an isolated browser context per scenario, restores
saved authentication for `@authenticated` scenarios, and captures screenshots and
traces for failures. `tests/auth.setup.spec.ts` creates reusable browser state;
`scripts/generate-report.cjs` converts the Cucumber JSON output to HTML; `.github/`
contains the CI workflow; `TEST_CASES.md` and `BUGS.md` contain the manual QA artifacts.

## Design decisions

Cucumber keeps the user-facing flow readable and allows scenario outlines for
parameterized authentication checks. Step definitions map the Gherkin steps to
web-first Playwright assertions and actions, while page objects own reusable locators
and interactions. The happy path logs in through the UI because authentication is part
of that scenario; other authenticated scenarios reuse captured storage state. The
framework currently targets Chromium, uses CI-only retries and parallel execution, and
collects screenshots and traces on failure. A separate Playwright Test setup spec is
used for state generation; the checkout scenarios themselves run through Cucumber.

## BUG-001 Regression

The tagged `@BUG-001` scenario starts with an authenticated empty cart, attempts checkout
with valid customer information, and asserts that the flow is blocked with a message or
cart redirect rather than reaching order confirmation. It currently fails because the
application displays the order confirmation for an empty cart. Reproduction details and
the screenshot/trace are recorded in [BUGS.md](BUGS.md).

## Known limitations

- Chromium is the only configured browser; Firefox and WebKit are not covered.
- Sauce Demo is a public demo application and may change or become unavailable.
- The confirmed BUG-001 scenario makes the full suite red until the application defect
  is fixed; keep this expected failure visible when reviewing CI results.
- Complete and verify the manual exploratory-session duration, execution statuses, and
  any remaining environment details in [BUGS.md](BUGS.md) and [TEST_CASES.md](TEST_CASES.md)
  before submitting the QA deliverables.
- The Playwright UI script opens the authentication setup spec, not the Cucumber suite.

## Repository hygiene

Commit `package-lock.json` and the BUG-001 screenshot/trace referenced in `BUGS.md`.
Do not commit `node_modules/`, generated reports, or `playwright/.auth/` state files.
