module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow usage of deprecated classNames',
      category: 'Best Practices',
      recommended: true
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          name: { type: 'string' },
          nameRegExp: { instanceof: 'RegExp' },
          names: { type: 'array', items: { type: 'string' } },
          use: { type: 'string' }
        },
        additionalProperties: false
      }
    ]
  },

  create(context) {
    const { name, nameRegExp, names, use } = context.options[0]

    function checkClassNames(node, classNames) {
      if (name && classNames.includes(name)) {
        context.report({
          node,
          message: `Class name "${name}" is deprecated. Use "${use}" instead.`
        })
      }
      if (nameRegExp) {
        classNames.forEach((className) => {
          if (nameRegExp.test(className)) {
            context.report({
              node,
              message: `Class name "${className}" is deprecated. Use "${use}" instead.`
            })
          }
        })
      }

      if (names && names.some((n) => classNames.includes(n))) {
        const deprecatedClassNames = names.filter((n) => classNames.includes(n))
        deprecatedClassNames.forEach((deprecatedClassName) => {
          context.report({
            node,
            message: `Class name "${deprecatedClassName}" is deprecated. Use "${use}" instead.`
          })
        })
      }
    }

    return {
      JSXAttribute(node) {
        if (node.name.name === 'className') {
          if (node.value && node.value.type === 'Literal' && typeof node.value.value === 'string') {
            const classNames = node.value.value.split(' ')
            checkClassNames(node, classNames)
          } else if (
            node.value &&
            node.value.type === 'JSXExpressionContainer' &&
            node.value.expression.type === 'TemplateLiteral'
          ) {
            node.value.expression.quasis.forEach((element) => {
              if (element.value && element.value.raw) {
                const classNames = element.value.raw.split(' ')
                checkClassNames(node, classNames)
              }
            })
          }
        }
      }
    }
  }
}
