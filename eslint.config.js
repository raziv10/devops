// eslint.config.js
const { Linter } = require("eslint");

const config = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-base",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
  ],
  rules: {
    "constructor-super": "error",
    "no-const-assign": "error",
    "no-this-before-super": "error",
    "no-undef": "error",
    "no-unreachable": "error",
    "no-unused-vars": ["warn", { "args": "none" }],
    "no-console": "off",
    "prefer-const": "warn",
  },
};

module.exports = config;
