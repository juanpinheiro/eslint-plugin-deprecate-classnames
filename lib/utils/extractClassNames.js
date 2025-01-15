function processClassNames(value) {
  if (!value || typeof value !== 'string') return [];
  return value
    .split(' ')
    .map((className) => className.trim())
    .filter((className) => className);
}

function extractFromTemplateLiteral(templateLiteral) {
  if (!templateLiteral || templateLiteral.type !== 'TemplateLiteral') return [];

  const classNames = [];

  templateLiteral.quasis.forEach((element, index) => {
    if (element.value.raw) {
      classNames.push(...processClassNames(element.value.raw));
    }

    if (templateLiteral.expressions[index]) {
      const expr = templateLiteral.expressions[index];
      if (expr.type === 'Literal' && typeof expr.value === 'string') {
        classNames.push(...processClassNames(expr.value));
      }
    }
  });

  return classNames;
}

function extractClassNamesFromClasses(node) {
  if (node.value.expression && node.value.expression.properties) {
    return node.value.expression.properties.reduce((acc, property) => {
      if (property.value.type === 'Literal' && typeof property.value.value === 'string') {
        return [...acc, ...processClassNames(property.value.value)];
      }
      return acc;
    }, []);
  }
  return [];
}

function extractClassNamesFromClassName(node) {
  if (node.value) {
    if (node.value.type === 'Literal' && typeof node.value.value === 'string') {
      return processClassNames(node.value.value);
    }

    if (node.value.type === 'JSXExpressionContainer') {
      return extractFromTemplateLiteral(node.value.expression);
    }
  }

  return [];
}

module.exports = { extractClassNamesFromClasses, extractClassNamesFromClassName };
