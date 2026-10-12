module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: [
      'features/support/**/*.ts',
      'features/step-definitions/**/*.ts'
    ],
    format: [
      'progress',
      'json:reports/cucumber-report.json'
    ],
    publishQuiet: true,
    parallel: process.env.CI ? 2 : 0,
    retry: process.env.CI ? 1 : 0,
    tags: '@all'
  }
};
