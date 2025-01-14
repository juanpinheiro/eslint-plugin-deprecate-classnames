const ruleTester = require('../helpers/ruleTester');
const rule = require('../../lib/rules/classes');

ruleTester.run('deprecate-classnames/classes', rule, {
  valid: [
    {
      code: '<div classes={{ root: "valid-class" }} />',
      options: [{ name: 'deprecated', use: 'new-class' }],
    },
    {
      code: '<div classes={{ root: "valid-class-1 valid-class-2" }} />',
      options: [{ names: ['deprecated-1', 'deprecated-2'], use: 'new-class' }],
    },
    {
      code: '<div classes={{ root: "valid-class-1 valid-class-2" }} />',
      options: [{ nameRegExp: /^tw-/, use: 'new-class' }],
    },
  ],
  invalid: [
    {
      code: '<div classes={{ root: "deprecated" }} />',
      errors: [{ message: 'Class name "deprecated" is deprecated. Use "new-class" instead.' }],
      options: [{ name: 'deprecated', use: 'new-class' }],
    },
    {
      code: '<div classes={{ root: "deprecated-1 deprecated-2" }} />',
      errors: [
        { message: 'Class name "deprecated-1" is deprecated. Use "new-class" instead.' },
        { message: 'Class name "deprecated-2" is deprecated. Use "new-class" instead.' },
      ],
      options: [{ names: ['deprecated-1', 'deprecated-2'], use: 'new-class' }],
    },
    {
      code: '<div classes={{ root: "tw-deprecated-1 tw-deprecated-2" }} />',
      errors: [
        { message: 'Class name "tw-deprecated-1" is deprecated. Use "new-class" instead.' },
        { message: 'Class name "tw-deprecated-2" is deprecated. Use "new-class" instead.' },
      ],
      options: [{ nameRegExp: /^tw-/, use: 'new-class' }],
    },
  ],
});
