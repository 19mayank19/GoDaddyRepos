const rootDir = __dirname;

module.exports = {
    preset: 'ts-jest',
    testMatch: [
		`${rootDir}/src/**/__tests__/**/*.test.{js,jsx,mjs,tsx,ts}`,
	],
    transform: {
		'^.+\\.(js|jsx|mjs|tsx|ts)$': `${rootDir}/jestPreprocessor.js`,
		'^.+\\.(t)sx?$': 'ts-jest',
	},
    moduleNameMapper: {
		'\\.(css|less|scss)$': 'identity-obj-proxy',
	},
    moduleFileExtensions: ['js', 'jsx', 'mjs', 'ts', 'tsx'],
    collectCoverage: true,
	testResultsProcessor: 'jest-sonar-reporter',
	testEnvironment: 'jsdom',
	verbose: true,
	coverageReporters: ['lcov', 'text'],
}