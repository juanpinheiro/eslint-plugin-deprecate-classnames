const rule = require('../../lib/rules/classes');
const ruleTester = require('../helpers/ruleTester');

// Run the tests for the 'deprecate-classnames/classes' ESLint rule
ruleTester.run('deprecate-classnames/classes', rule, {
  // Test cases where the rule should pass (valid cases)
  valid: [
    {
      // Test: No deprecated class name is used
      code: '<div classes={{ root: "valid-class" }} />',
      options: [{ name: 'deprecated', use: 'new-class' }]
    },
    {
      // Test: Multiple class names without any deprecated ones
      code: '<div classes={{ root: "valid-class-1 valid-class-2" }} />',
      options: [{ names: ['deprecated-1', 'deprecated-2'], use: 'new-class' }]
    },
    {
      // Test: Class names do not match the given RegExp
      code: '<div classes={{ root: "valid-class-1 valid-class-2" }} />',
      options: [{ nameRegExp: /^tw-/, use: 'new-class' }]
    }
  ],
  // Test cases where the rule should fail (invalid cases)
  invalid: [
    {
      // Test: Single deprecated class name
      code: '<div classes={{ root: "deprecated" }} />',
      options: [{ name: 'deprecated', use: 'new-class' }],
      errors: [
        { message: 'Class name "deprecated" is deprecated. Use "new-class" instead.' }
      ]
    },
    {
      // Test: Multiple deprecated class names defined using an array
      code: '<div classes={{ root: "deprecated-1 deprecated-2" }} />',
      options: [{ names: ['deprecated-1', 'deprecated-2'], use: 'new-class' }],
      errors: [
        { message: 'Class name "deprecated-1" is deprecated. Use "new-class" instead.' },
        { message: 'Class name "deprecated-2" is deprecated. Use "new-class" instead.' }
      ]
    },
    {
      // Test: Class names matching a RegExp pattern
      code: '<div classes={{ root: "tw-deprecated-1 tw-deprecated-2" }} />',
      options: [{ nameRegExp: /^tw-/, use: 'new-class' }],
      errors: [
        { message: 'Class name "tw-deprecated-1" is deprecated. Use "new-class" instead.' },
        { message: 'Class name "tw-deprecated-2" is deprecated. Use "new-class" instead.' }
      ]
    },
    {
      // Test: Class names matching a string-based RegExp
      code: '<div classes={{ root: "tw-deprecated-1 tw-deprecated-2" }} />',
      options: [{ nameRegExp: '/^tw-/', use: 'new-class' }],
      errors: [
        { message: 'Class name "tw-deprecated-1" is deprecated. Use "new-class" instead.' },
        { message: 'Class name "tw-deprecated-2" is deprecated. Use "new-class" instead.' }
      ]
    },
    {
      // Test: Multiple rules with different match criteria (name and RegExp)
      code: '<div classes={{ root: "tw-deprecated old-classname" }} />',
      options: [
        { name: 'old-classname', use: 'new-classname' },
        { nameRegExp: /^tw-/, use: 'new-class' }
      ],
      errors: [
        { message: 'Class name "tw-deprecated" is deprecated. Use "new-class" instead.' },
        { message: 'Class name "old-classname" is deprecated. Use "new-classname" instead.' },
      ]
    },
    {
      // Test: String-based RegExp pattern applied to class names
      code: '<div classes={{ root: "tw-deprecated-1 tw-deprecated-2" }} />',
      options: [{ nameRegExp: '/^tw-/', use: 'new-class' }],
      errors: [
        { message: 'Class name "tw-deprecated-1" is deprecated. Use "new-class" instead.' },
        { message: 'Class name "tw-deprecated-2" is deprecated. Use "new-class" instead.' }
      ]
    },
    {
      // Test: RegExp pattern without enclosing slashes applied to class names
      code: '<div classes={{ root: "tw-deprecated-1 tw-deprecated-2" }} />',
      options: [{ nameRegExp: '^tw-', use: 'new-class' }],
      errors: [
        { message: 'Class name "tw-deprecated-1" is deprecated. Use "new-class" instead.' },
        { message: 'Class name "tw-deprecated-2" is deprecated. Use "new-class" instead.' }
      ]
    }
  ]
});
