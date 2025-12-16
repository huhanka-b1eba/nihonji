module.exports = {
    extends: ["stylelint-config-standard-scss"],

    plugins: ["stylelint-scss"],

    rules: {
        /* SCSS */
        "scss/at-rule-no-unknown": true,

        /* стиль */
        "color-hex-length": "short",

        /* не душим */
        "selector-class-pattern": null,
        "selector-id-pattern": null,
        "keyframes-name-pattern": null,

        /* шумные */
        "no-descending-specificity": null,
        "declaration-block-no-redundant-longhand-properties": null,
    },
};
