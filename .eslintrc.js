module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard", "@vue/typescript"],
  rules: {
    semi: ["error", "always"],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "always",
        asyncArrow: "always"
      }
    ],
    quotes: ["error", "double"],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)"],
      env: {
        jest: true
      }
    }
  ]
};
