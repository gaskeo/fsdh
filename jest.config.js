/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  "collectCoverage": true,
  "collectCoverageFrom": [
    "src/**/*.ts"
  ],
  coverageThreshold: {
    global: {
      functions: 80,
      lines: 80,
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  resolver: "ts-jest-resolver",
};
