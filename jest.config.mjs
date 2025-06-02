/**
 * @type {import("jest").Config}
 */
const config = {
	rootDir: ".",
	testMatch: ["<rootDir>/tests/**/*.spec.{js,ts}"],
	transform: {
		"^.+\\.[jt]s$": [
			"@swc/jest",
			{
				jsc: {
					target: "es2022",
				},
			},
		],
	},
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"^@abstractions/(.*)$": "<rootDir>/src/abstractions/$1",
		"^__mocks__/(.*)$": "<rootDir>/__mocks__/$1",
	},
	clearMocks: true,
	collectCoverage: true,
	collectCoverageFrom: [
		"./src/**/*.{js,ts}",
		"!src/handler.ts",
		"!**/*.d.ts",
		"!**/node_modules/**",
	],
	testEnvironment: "node",
	testEnvironmentOptions: {
		NODE_ENV: "test",
	},
	coverageThreshold: {
		global: {
			branches: 30,
			functions: 30,
			lines: 30,
			statements: 30,
		},
	},
	testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/build/"],
};

export default config;
