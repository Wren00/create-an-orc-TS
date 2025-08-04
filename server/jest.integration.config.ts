import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globalSetup: './test/global-setup.js',
    globalTeardown: './test/global-teardown.js',
    setupFilesAfterEnv: [],
    testMatch: ['**/test/integration/**/*.test.ts'],
    forceExit: true,
    detectOpenHandles: true,
};

export default config;