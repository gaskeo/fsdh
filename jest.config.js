/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  "collectCoverage": true,
  "collectCoverageFrom": [
    "src/**/*.ts"
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  resolver: "ts-jest-resolver",
};
