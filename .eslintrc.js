module.exports = {
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: "module"
    },
    env: {
      browser: true
    },
    extends: ["eslint:recommended"],
    rules: {
        semi: 2
    },
    globals: {
        require: false,
        hyperHTML: false,
        asyncPage: false
    }
}
