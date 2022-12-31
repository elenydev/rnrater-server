module.exports = {
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./mocks/singleton.ts'],
    testTimeout: 10000
}