// Import the rule and the custom RuleTester helper
const rule = require('../../lib/rules/classnames');
const ruleTester = require('../helpers/ruleTester');

// Run the tests for the 'deprecate-classnames/classnames' ESLint rule
ruleTester.run('deprecate-classnames/classnames', rule, {
  // Test cases where the rule should pass (valid cases)
  valid: [
    {
    // Test: No deprecated class names provided; should not trigger
      code: '<div className="valid-class" />',
      options: [{ name: 'deprecated', use: 'new-class' }]
    },
    {
      // Test: No deprecated class names present in the className attribute
      code: '<div className="valid-class-1 valid-class-2" />',
      options: [{ names: ['deprecated-1', 'deprecated-2'], use: 'new-class' }]
    },
    {
      // Test: Class names do not match the given RegExp pattern
      code: '<div className="valid-class-1 valid-class-2" />',
      options: [{ nameRegExp: /^tw-/, use: 'new-class' }]
    }
  ],
  // Test cases where the rule should fail (invalid cases)
  invalid: [
    {
      // Test: Single deprecated class name in the className attribute
      code: '<div className="deprecated" />',
      options: [{ name: 'deprecated', use: 'new-class' }],
      errors: [
        { message: 'Class name "deprecated" is deprecated. Use "new-class" instead.' }
      ]
    },
    {
      // Test: Multiple deprecated class names defined using an array
      code: '<div className="deprecated-1 deprecated-2" />',
      options: [{ names: ['deprecated-1', 'deprecated-2'], use: 'new-class' }],
      errors: [
        { message: 'Class name "deprecated-1" is deprecated. Use "new-class" instead.' },
        { message: 'Class name "deprecated-2" is deprecated. Use "new-class" instead.' }
      ]
    },
    {
      // Test: Class names matching a RegExp pattern
      code: '<div className="tw-deprecated-1 tw-deprecated-2" />',
      options: [{ nameRegExp: /^tw-/, use: 'new-class' }],
      errors: [
        { message: 'Class name "tw-deprecated-1" is deprecated. Use "new-class" instead.' },
        { message: 'Class name "tw-deprecated-2" is deprecated. Use "new-class" instead.' }
      ]
    },
    {
      // Test: Multiple rules with different match criteria (name and RegExp)
      code: '<div className="tw-deprecated old-classname" />',
      options: [
        { name: 'old-classname', use: 'new-classname' },
        { nameRegExp: /^tw-/, use: 'new-class' }
      ],
      errors: [
        { message: 'Class name "tw-deprecated" is deprecated. Use "new-class" instead.' },
        { message: 'Class name "old-classname" is deprecated. Use "new-classname" instead.' }
      ]
    },
    {
      // Test: String-based RegExp pattern applied to class names
      code: '<div className="tw-deprecated old-classname" />',
      options: [
        { name: 'old-classname', use: 'new-classname' },
        { nameRegExp: '/^tw-/', use: 'new-class' }
      ],
      errors: [
        { message: 'Class name "tw-deprecated" is deprecated. Use "new-class" instead.' },
        { message: 'Class name "old-classname" is deprecated. Use "new-classname" instead.' }
      ]
    },
    {
      // Test: RegExp pattern without enclosing slashes applied to class names
      code: '<div className="tw-deprecated old-classname" />',
      options: [
        { name: 'old-classname', use: 'new-classname' },
        { nameRegExp: '^tw-', use: 'new-class' }
      ],
      errors: [
        { message: 'Class name "tw-deprecated" is deprecated. Use "new-class" instead.' },
        { message: 'Class name "old-classname" is deprecated. Use "new-classname" instead.' }
      ]
    },
    {
      // Test: Template literals with both literal and interpolated class names
      code: '<div className={`tw-deprecated ${"old-classname"}`} />',
      options: [
        { name: 'old-classname', use: 'new-classname' },
        { nameRegExp: /^tw-/, use: 'new-class' }
      ],
      errors: [
        { message: 'Class name "tw-deprecated" is deprecated. Use "new-class" instead.' },
        { message: 'Class name "old-classname" is deprecated. Use "new-classname" instead.' }
      ]
    }
  ]
});
