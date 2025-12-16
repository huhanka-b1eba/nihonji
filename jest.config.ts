import type { Config } from "jest";

const config: Config = {
    testEnvironment: "jsdom",
    preset: "ts-jest",

    moduleFileExtensions: ["ts", "tsx", "js"],
    testMatch: ["**/*.test.(ts|tsx)"],

    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

    moduleNameMapper: {
        "^app/(.*)$": "<rootDir>/src/app/$1",
        "^pages/(.*)$": "<rootDir>/src/pages/$1",
        "^widgets/(.*)$": "<rootDir>/src/widgets/$1",
        "^features/(.*)$": "<rootDir>/src/features/$1",
        "^entities/(.*)$": "<rootDir>/src/entities/$1",
        "^shared/(.*)$": "<rootDir>/src/shared/$1",
        "\\.(css|scss)$": "identity-obj-proxy",
    },

    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!src/**/*.d.ts",
        "!src/app/**",
    ],
};

export default config;
