/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: [
    '**/test/**/*.test.ts',
    '**/src/**/__tests__/**/*.test.ts'  // 👈 add this line
  ],
};