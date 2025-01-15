const babelParser = require('@babel/eslint-parser')

module.exports = [
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-env']
        }
      }
    },
    rules: {
      'import/no-commonjs': 'off',
      'global-require': 'off',
      'max-len': 'off'
    }
  }
]
