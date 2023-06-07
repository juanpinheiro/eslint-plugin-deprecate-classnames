# eslint-plugin-deprecate-classnames

[![NPM version](http://img.shields.io/npm/v/eslint-plugin-deprecate-classnames.svg)](https://www.npmjs.com/package/eslint-plugin-deprecate-classnames)
![downloads](https://img.shields.io/npm/dm/eslint-plugin-deprecate-classnames.svg)

This plugin helps you to refactor your codebase. This is an extension of [eslint-plugin-deprecate](https://github.com/AlexMost/eslint-plugin-deprecate).

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-deprecate-classnames`:

```
$ npm install eslint-plugin-deprecate-classnames --save-dev
```

## Usage

Add `deprecate` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "deprecate-classnames"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "deprecate/classnames": ["error",
            {"name": "classnames", "use": "new-classnames"}
        ]
    }
}
```

```json
{
    "rules": {
        "deprecate/classnames": ["error",
            {"names": ["classname1", "classname2"], "use": "new-classnames"}
        ]
    }
}
```

```json
{
    "rules": {
        "deprecate/classnames": ["error",
            {"nameRegExp": "tw-", "use": "new-classnames"}
        ]
    }
}
```