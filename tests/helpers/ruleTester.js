const { RuleTester } = require('eslint');
const baseConfig = require('../../eslint.config.js');

class FlatRuleTester extends RuleTester {
  run(name, rule, tests) {
    const applyBaseConfig = (testCases) =>
      testCases.map((testCase) => ({
        ...testCase,
        languageOptions: baseConfig[0].languageOptions,
        rules: baseConfig[0].rules,
      }));

    const cleanTests = {
      valid: applyBaseConfig(tests.valid || []),
      invalid: applyBaseConfig(tests.invalid || []),
    };

    super.run(name, rule, cleanTests);
  }
}

module.exports = new FlatRuleTester();
