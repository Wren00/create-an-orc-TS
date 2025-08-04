import type {Config} from 'jest';

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    globalSetup: "<rootDir>/test/global-setup.js",
    globalTeardown: "<rootDir>/test/global-teardown.js",
    testMatch: ["<rootDir>/src/routers/__tests__/**.ts"],
    testTimeout: 30000,
};

export default config;