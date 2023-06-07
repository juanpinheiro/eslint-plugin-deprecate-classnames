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

### Rule `classnames`

to identify the use of deprecated classnames in JSX/TSX files:

```jsx
<div className="test-classname test-classname-2" />
```

use the following configuration:

```json
// Specific classnames
{
    "rules": {
        "deprecate-classnames/classnames": ["error",
            {"name": "test-classname", "use": "new-classname"}
        ]
    }
}
```


```json
// Multiple classnames
{
    "rules": {
        "deprecate-classnames/classnames": ["error",
            {"names": ["test-classname", "test-classname-2"], "use": "new-classname"}
        ]
    }
}
```

```json
// RegExp
{
    "rules": {
        "deprecate-classnames/classnames": ["error",
            {"nameRegExp": "test-", "use": "new-classnames"}
        ]
    }
}
```

### Rule `classes`


```jsx
<div classes={{ root: "test-classname test-classname-2" }} />
```

use the following configuration:

```json
// Specific classnames
{
    "rules": {
        "deprecate-classnames/classes": ["error",
            {"name": "test-classname", "use": "new-classname"}
        ]
    }
}
```

```json
// Multiple classnames
{
    "rules": {
        "deprecate-classnames/classes": ["error",
            {"names": ["test-classname", "test-classname-2"], "use": "new-classname"}
        ]
    }
}
```

```json
// RegExp
{
    "rules": {
        "deprecate-classnames/classes": ["error",
            {"names": ["test-classname", "test-classname-2"], "use": "new-classname"}
        ]
    }
}
```

```json
{
    "rules": {
        "deprecate-classnames/classes": ["error",
            {"nameRegExp": "test-", "use": "new-classnames"}
        ]
    }
}
```
