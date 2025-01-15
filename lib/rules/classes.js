const ClassNameChecker = require('../utils/classNameChecker');
const { extractClassNamesFromClasses } = require('../utils/extractClassNames');

module.exports = {
  meta: {
    docs: {
      description: 'Disallow usage of deprecated classNames in "classes" attribute',
      category: 'Best Practices',
      recommended: true
    },
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          nameRegExp: { type: ['string', 'object'] },
          names: { type: 'array', items: { type: 'string' } },
          use: { type: 'string' }
        },
        additionalProperties: false
      }
    }
  },

  create(context) {
    const rules = context.options.map((option) => new ClassNameChecker(option));

    return {
      JSXAttribute(node) {
        if (node.name.name === 'classes') {
          const classNames = extractClassNamesFromClasses(node);

          classNames.forEach((className) => {
            rules.forEach((rule) => {
              const errors = rule.check([className]);
              errors.forEach(({ message }) => context.report({ node, message }));
            });
          });
        }
      }
    };
  }
};
