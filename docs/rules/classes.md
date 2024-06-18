# Prevents Deprecated Material-UI Classes Usage

## Rule Details

This rule allows you to forbid the usage of deprecated Material-UI class names in your codebase and suggests alternatives. It is especially useful for large teams during a refactor process.

### Example:
Let's consider we have this configuration in `.eslintrc`:

```json
{
  "plugins": ["deprecate"],
  "rules": {
    "deprecate/classes": ["error",
      { "name": "MuiOldClass", "use": "MuiNewClass" }
    ]
  }
}
```

### The following patterns are considered as errors:

```jsx
// any usage of class "MuiOldClass"
<div classes={{ root: "MuiOldClass" ❌ }}>Deprecated class</div>
```

### The following patterns are not errors:

```jsx
// usage of non-deprecated classes
<div classes={{ root: "MuiNewClass" ✅  }}>Updated class</div>
```

## Options

You can specify deprecated class names as strings or objects to provide more control and suggest alternatives:

### Simple string names:

```json
"deprecate/classes": [ 2, "MuiOldClass1", "MuiOldClass2" ]
```

### Detailed objects:

```json
"deprecate/classes": [ 2,
    { "name": "MuiOldClass1", "use": "MuiNewClass1" },
    { "name": "MuiOldClass2", "use": "MuiNewClass2" }
]
```

### Regular expression for class names:

```json
"deprecate/classes": [ 2,
    { "nameRegExp": "MuiOld.*", "use": "MuiNew.*" }
]
```