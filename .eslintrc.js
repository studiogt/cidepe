module.exports = {
	plugins: ["vue"],
	extends: ["plugin:vue/essential", "prettier"],
	parserOptions: {
		ecmaVersion: 2017
	},
	rules: {
		"vue/require-v-for": [0]
	}
};
