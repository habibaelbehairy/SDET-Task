module.exports = {
  testEnvironment: 'node',
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'Mock User Auth API Test Report',
      outputPath: './reports/test-report.html',
      includeFailureMsg: true,
      includeSuiteFailure: true,
      theme: 'lightTheme'
    }]
  ]
};
