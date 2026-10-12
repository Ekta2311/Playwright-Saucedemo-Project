const reporter = require('cucumber-html-reporter');
const fs = require('node:fs');
const path = require('node:path');

const jsonFile = path.join(process.cwd(), 'reports', 'cucumber-report.json');
if (!fs.existsSync(jsonFile)) {
  console.error('Cucumber JSON report not found. Run npm test first.');
  process.exit(1);
}

fs.mkdirSync(path.dirname(jsonFile), { recursive: true });

reporter.generate({
  theme: 'bootstrap',
  jsonFile,
  output: path.join(process.cwd(), 'reports', 'cucumber-report.html'),
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    'Test Environment': process.env.CI ? 'CI' : 'Local',
    Browser: 'Chromium',
    Framework: 'Playwright + Cucumber BDD',
    Language: 'TypeScript'
  }
});

console.log('HTML report created at reports/cucumber-report.html');
