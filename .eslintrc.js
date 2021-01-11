module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	settings: {
		react: {
			version: "latest"
		}
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": ["error", "windows"],
		quotes: ["error", "double", {
			avoidEscape: true,
			allowTemplateLiterals: true
		}],
		semi: ["error", "always"],
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-empty-function": "off",
		"@typescript-eslint/consistent-type-imports": ["warn", {
			prefer: "type-imports"
		}],
		"@typescript-eslint/no-unused-vars": ["warn", {
			args: "none"
		}],
	},
	ignorePatterns: [".eslintrc.js"],
};
