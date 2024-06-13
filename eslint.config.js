import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
	{
		plugins: {
			'@stylistic/js': stylisticJs
		},
		rules: {
			"@stylistic/js/arrow-spacing": ["warn", { "before": true, "after": true }],
			"@stylistic/js/brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
			"@stylistic/js/comma-dangle": ["error", "always-multiline"],
			"@stylistic/js/comma-spacing": "error",
			"@stylistic/js/comma-style": "error",
			"curly": ["error", "multi-line", "consistent"],
			"@stylistic/js/dot-location": ["error", "property"],
			'@stylistic/js/indent': ['error', 'tab'],
			"@stylistic/js/keyword-spacing": "error",
			"max-nested-callbacks": ["error", { "max": 4 }],
			"@stylistic/js/max-statements-per-line": ["error", { "max": 2 }],
			"no-console": "off",
			"no-empty-function": "error",
			"@stylistic/js/no-floating-decimal": "error",
			"no-lonely-if": "error",
			"@stylistic/js/no-multi-spaces": "error",
			"@stylistic/js/no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 1, "maxBOF": 0 }],
			"no-shadow": ["error", { "allow": ["err", "resolve", "reject"] }],
			"@stylistic/js/no-trailing-spaces": ["error"],
			"no-var": "error",
			"@stylistic/js/object-curly-spacing": ["error", "always"],
			"prefer-const": "error",
			"@stylistic/js/quotes": ["error", "single"],
			"@stylistic/js/semi": ["error", "always"],
			"@stylistic/js/space-before-blocks": "error",
			"@stylistic/js/space-before-function-paren": ["error", {
				"anonymous": "never",
				"named": "never",
				"asyncArrow": "always"
			}],
			"@stylistic/js/space-in-parens": "error",
			"@stylistic/js/space-infix-ops": "error",
			"@stylistic/js/space-unary-ops": "error",
			"@stylistic/js/spaced-comment": "error",
			"yoda": "error"
		}
	}
];

