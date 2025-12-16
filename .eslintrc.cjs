module.exports = {
    root: true,

    parser: "@typescript-eslint/parser",

    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },

    env: {
        browser: true,
        es2021: true,
    },

    plugins: [
        "@typescript-eslint",
        "react",
        "react-hooks",
        "import",
        "jsx-a11y",
    ],

    extends: [
        "airbnb",
        "airbnb/hooks",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],

    settings: {
        react: {
            version: "detect",
        },
        "import/resolver": {
            typescript: {},
        },
    },

    rules: {
        "react/react-in-jsx-scope": "off",

        "react/jsx-filename-extension": [
            "warn",
            { extensions: [".tsx"] },
        ],

        "import/extensions": "off",
        "import/prefer-default-export": "off",

        "@typescript-eslint/no-unused-vars": [
            "warn",
            { argsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/explicit-function-return-type": "off",

        "react/function-component-definition": [
            "error",
            { namedComponents: "arrow-function" },
        ],

        "react/require-default-props": "off",

        "@typescript-eslint/no-explicit-any": "warn",

        "jsx-a11y/click-events-have-key-events": "off",

        "jsx-a11y/no-static-element-interactions": "off",

        "react/jsx-props-no-spreading": "off",

        "react/button-has-type": "off",

        "jsx-a11y/control-has-associated-label": "off",
        "jsx-a11y/anchor-is-valid": "off",
        "jsx-a11y/no-noninteractive-element-interactions": "off",

        "no-nested-ternary": "off",
        "no-param-reassign": "off",

        "react/no-array-index-key": "warn",
    },
};
