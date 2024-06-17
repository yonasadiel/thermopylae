// jest.config.ts
export default {
    preset: 'ts-jest',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.ts",
        "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.ts"
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    injectGlobals: true,
    testEnvironment: 'jsdom',
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
};