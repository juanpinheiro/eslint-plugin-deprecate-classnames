# eslint-plugin-deprecate-classnames

[![NPM version](http://img.shields.io/npm/v/eslint-plugin-deprecate-classnames.svg)](https://www.npmjs.com/package/eslint-plugin-deprecate-classnames)
![downloads](https://img.shields.io/npm/dm/eslint-plugin-deprecate-classnames.svg)

This plugin helps you refactor your codebase by identifying and replacing deprecated css class names.

## Installation
First, you'll need to install [ESLint](http://eslint.org):

```sh
npm install eslint --save-dev
```

Next, install eslint-plugin-deprecate-classnames:

```sh
npm install eslint-plugin-deprecate-classnames --save-dev
```

## Usage
Add deprecate-classnames to the plugins section of your .eslintrc configuration file. You can omit the eslint-plugin- prefix:

```
{
    "plugins": [
        "deprecate-classnames"
    ]
}
```

Then configure the rules you want to use under the rules section.

## Rule: `classnames`
This rule identifies the use of deprecated class names in your JSX/TSX files and suggests alternatives.

### Example:
Given the following JSX code:

```jsx
<div className="test-classname test-classname-2" />
```

### Specific classnames:
```json
{
    "rules": {
        "deprecate-classnames/classnames": ["error",
            {"name": "test-classname", "use": "new-classname"}
        ]
    }
}
```

### Multiple classnames:
```json
{
    "rules": {
        "deprecate-classnames/classnames": ["error",
            {"names": ["test-classname", "test-classname-2"], "use": "new-classname"}
        ]
    }
}
```

### Regular expression for classnames:
```json
{
    "rules": {
        "deprecate-classnames/classnames": ["error",
            {"nameRegExp": "^test-", "use": "new-classname"}
        ]
    }
}
```

## Rule: `classes`
This rule identifies the use of deprecated class names within the [classes prop used in Material-UI components](https://v4.mui.com/customization/components/#overriding-styles-with-classes) and suggests alternatives.

### Example:
Given the following JSX code:

```jsx
<div classes={{ root: "test-classname test-classname-2" }} />
```

### Specific classnames:
```json
{
    "rules": {
        "deprecate-classnames/classes": ["error",
            {"name": "test-classname", "use": "new-classname"}
        ]
    }
}
```

### Multiple classnames:
```json
{
    "rules": {
        "deprecate-classnames/classes": ["error",
            {"names": ["test-classname", "test-classname-2"], "use": "new-classname"}
        ]
    }
}
```

### Regular expression for classnames:
```json
{
    "rules": {
        "deprecate-classnames/classes": ["error",
            {"nameRegExp": "^test-", "use": "new-classname"}
        ]
    }
}
```

### Summary
[eslint-plugin-deprecate-classnames](https://www.npmjs.com/package/eslint-plugin-deprecate-classnames) is a powerful tool for maintaining a clean and up-to-date codebase by ensuring deprecated class names are systematically identified and replaced. This is especially useful for large teams and during major refactoring efforts. By integrating this plugin, you can automate the enforcement of class name conventions and improve code quality.

For more information, visit the [npm package page](https://www.npmjs.com/package/eslint-plugin-deprecate-classnames).

## Credits
This plugin is an extension of the [eslint-plugin-deprecate](https://github.com/AlexMost/eslint-plugin-deprecate) by AlexMost. The original plugin provides a flexible way to deprecate functions and variables, and this extension builds on that foundation to specifically target and manage deprecated class names in JSX and TSX files, with a special focus on the `classes` prop used in Material-UI components.
