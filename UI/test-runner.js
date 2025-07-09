const { execSync } = require('child_process');

// Print current directory and list test files
console.log('Current directory:', process.cwd());
console.log('Looking for test files in ./tests:');
try {
  const result = execSync('find ./tests -name "*.js" | sort').toString();
  console.log(result || 'No test files found');
} catch (error) {
  console.log('Error listing files:', error.message);
}

// Run tests with more verbose output
try {
  console.log('\nRunning Nightwatch tests with verbose output:');
  execSync('npx nightwatch --verbose', { stdio: 'inherit' });
} catch (error) {
  console.error('\nTest execution failed:', error.message);
  process.exit(1);
}