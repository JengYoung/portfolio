module.exports = {
  customSyntax: "@stylelint/postcss-css-in-js",
  extends: [
    "stylelint-config-recommended-scss",
    "stylelint-config-prettier-scss",
    'stylelint-config-recess-order'
  ],
  "plugins": ["stylelint-prettier"],
  "rules": {
    "prettier/prettier": true,
    "no-empty-first-line": null
  }
};
