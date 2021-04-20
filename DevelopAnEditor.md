# Develop an editor

## Develop

examples: [https://github.com/MyEditorCool/editors/tree/master/packages](https://github.com/MyEditorCool/editors/tree/master/packages)

### 1. Develop with you familiar stack.

### 2. Add an entry file with these exports:

```javascript

// optional. Read file as text. If not true, your editor will receive binary array as content.
// checkout https://github.com/MyEditorCool/editors/tree/master/packages/imageEditor for binary content example.
export const readAsText = true

// optional. myeditor.cool will use it when user create new file.  
export const emptyContent = ''
 
// optional
export async function setup(content) {
  // transform content or do anything you need.
  // returned key values will be passed to as 1st argument to render function
  return {}
}

// if no setup function exported, content will be passed in as field 'content'. 
// otherwise props will be the object your setup function returned.
export function render({ onSave, onChange, content}, rootElement) {
  // onSahve: call onSave when user want to save file content: onSave(newContent). 
  // onChange: call onChange when user changed file content.
  // content: when no setup function exported, file content will be passed in througn this argument. 
}
```

### 3. Add `myeditorcool` field to package.json

```javascript
{
  ...
  "myeditorcool": {
    "entry": "", // string. path to your entry file.
    "extension": "", // string|[string]. supported file extension,
  }
}
```

## Publish

1. Publish your package to npm. When user install your package, myeditor.cool will read your package.json file to find entry file.
2. reate a PR to [publicEditors.json](https://github.com/MyEditorCool/editors/blob/master/publicEditors.json) show you editor in myeditor.cool list.

## Preview & Debug

You can preview your editor use custom install:

1. Open Configuration in myeditor.cool
2. paste your package web cdn address. If you published package to npm, you can use `https://unpkg.com/{package.name}@{package.version}`.
3. you can also start a local file server to serve your pakcage for local debugging. 

