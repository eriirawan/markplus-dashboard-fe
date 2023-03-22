// Try to make it compatiable with default eslint rule from create-react-app
// The another way round to change CRACO to fit prettier is possible
// but making life less easy but out great value add
// To have a config file that cli/vscode and other plugin won't fight each other.
// Even not used by CI.
module.exports = {
  endOfLine: 'lf',
  printWidth: 120,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  useTabs: false,
};
