# React Project with Testing

This is a boilerplate for a React project that includes unit testing, end-to-end (E2E) testing with Cypress and Playwright, as well as continuous integration (CI) configurations for all tests.

## Project Setup

To get started, follow these steps:

### 1. Install Dependencies

Begin by installing the necessary dependencies for the project. You can do this by running the following command:

```bash
npm install
```
This will install the necessary packages for the project, including:

- Vistest for unit testing.
- React for building the application.
- Cypress for end-to-end (E2E) testing.
- Playwright for additional E2E tests.
- Testing Library for unit tests.
- Testing Library Cypress for E2E tests with Cypress.

### 2. Configuration
The project comes preconfigured with the following testing tools:

Cypress is set up for end-to-end (E2E) testing, including Testing Library Cypress tests.
Playwright is also configured for running additional E2E tests.

### 3. Run Unit Tests
To run the unit tests with Jest, simply run:

```bash
  npm run test
``` 

### 4. Run E2E Tests with Cypress
To run end-to-end tests (E2E) with Cypress, you can use the following command:

```bash
  npm run test:e2e:cypress
``` 

### 5. Run E2E Tests with Playwright
For end-to-end tests with Playwright, use the following command:

```bash
  npm run test:e2e:playwright
``` 

### 6. Continuous Integration (CI)
The project has been set up to run all tests (unit tests, Cypress E2E tests, and Playwright E2E tests) in the CI environment. The following steps are integrated into the CI:

- Unit Tests are executed with Vitest.
- E2E Tests with Cypress are executed with Cypress.
- E2E Tests with Playwright are executed with Playwright.
- The setup ensures that all tests are run automatically when a pull request is created or updated.

### 7. Pull Requests
E2E tests with Cypress and Playwright are included in the pull request to ensure that any changes are tested across all components before being merged.
Unit tests are also included to verify the correctness of small units of code.
To install the necessary dependencies:

```bash
npm install vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jsdom @testing-library/dom @testing-library/cypress cypress playwright
```

Conclusion
This project is a template that includes unit testing, end-to-end tests with Cypress and Playwright, and continuous integration for the automated execution of tests. You can add new components and tests, ensuring that all your code is covered and works as expected across different environments.