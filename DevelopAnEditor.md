# Develop an editor

## Develop

examples: [https://github.com/MyEditorCool/editors/tree/master/packages](https://github.com/MyEditorCool/editors/tree/master/packages)

### 1. Develop with you familiar stack.

### 2. Add an entry file with these exports:

```javascript

// optional
export async function setup(content) {
  // transform content or do anything you need.
  // returned object will be passed to render function
  return {}
}

// if no setup function exported, content will be passed in as field 'content'. 
// otherwise props will be the object your setup function returned.
export function render(props, rootElement) {
  // mount your editor
}
```

### 3. Add `myeditorcool` field to package.json

```javascript
{
  ...
  "myeditorcool": {
    "entry": "", // string. path to your entry file.
    "extension": "", // string|[string]. supported file extension,
    "readAsText": true, // bool. Read file as text. If not true, your editor will receive binary array as content.  
  }
}
```

## Publish

1. Publish your package to npm. When user install your package, myeditor.cool will read your package.json file to find entry file.
2. reate a PR to [publicEditors.json](https://github.com/MyEditorCool/editors/blob/master/publicEditors.json) show you editor in myeditor.cool list.
