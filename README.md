# SDET-Task

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/habibaelbehairy/SDET-Task/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/habibaelbehairy/SDET-Task/tree/main)

## Overview

This repository contains a comprehensive SDET (Software Development Engineer in Test) task, split into two main components:

- **API**: Contains a mock user authentication API built with Node.js. It includes endpoints for user management and authentication, with tests written using Jest. Reports and coverage are generated for API tests.

- **UI**: Contains automated UI tests using Nightwatch.js. Page objects and custom commands are provided for maintainable and scalable test automation. Test results and reports are available in the `tests_output` directory.

## Structure

- `API/` - Mock user authentication API, test scripts, and reports
- `UI/` - Nightwatch.js UI automation tests, page objects, and reports

## Getting Started

### API

1. Navigate to the `API` directory:
   ```sh
   cd API
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run tests:
   ```sh
   npx jest tests/
   ```

### UI

1. Navigate to the `UI` directory:
   ```sh
   cd UI
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run Nightwatch tests:
   ```sh
   npx nightwatch
   ```
   
## Reports

- API test and coverage reports: `API/reports/`
- UI test reports: `UI/tests_output/`

---

For more details, refer to the documentation in the `API/docs/` and `UI/docs/` folders.
