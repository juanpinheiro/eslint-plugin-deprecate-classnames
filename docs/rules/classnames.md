# Prevents Deprecated Class Names Usage

## Rule Details

This rule allows you to forbid the usage of deprecated class names in your codebase and suggests alternatives. It is especially useful for large teams during a refactor process.

### Example:
Let's consider we have this configuration in `.eslintrc`:

```json
{
  "plugins": ["deprecate"],
  "rules": {
    "deprecate/classnames": ["error",
      { "name": "old-class", "use": "new-class" }
    ]
  }
}

### The following patterns are considered as errors:

```jsx
// any usage of class "old-class"
<div className="old-class❌">Deprecated class</div>
```

### The following patterns are not errors:

```jsx
// usage of non-deprecated classes
<div className="new-class✅">Updated class</div>
```

### Options

You can specify deprecated class names as strings or objects to provide more control and suggest alternatives:

## Simple string names:

```json
"deprecate/classnames": [ 2, "old-class1", "old-class2" ]
```

## Detailed objects:


```json
"deprecate/classnames": [ 2,
    { "name": "old-class1", "use": "new-class1" },
    { "name": "old-class2", "use": "new-class2" }
]
```

## Regular expression for class names:

```json
"deprecate/classnames": [ 2,
    { "nameRegExp": "old-.*", "use": "new-*"}
]
```
