# Develop an editor

## Develop

examples: [https://github.com/MyEditorCool/editors/tree/master/packages](https://github.com/MyEditorCool/editors/tree/master/packages)

### 1. Develop with you familiar stack.

### 2. Add an entry file with these exports:

```javascript

// Read file as text. If not true, your editor will receive binary array as content.
// checkout https://github.com/MyEditorCool/editors/tree/master/packages/imageEditor for binary content example.
export const readAsText = true
 
// optional
/**
 * @params {string|Unit8Array} content. Current file content. If export readAsText = true, type will be string, otherwise Unit8Array
 * @params {string} filepath. Current file path.
 * @params {object} api. File system like api to read/write other files. Checkout https://github.com/MyEditorCool/editors/tree/master/packages/erEditor for example.
 */
export async function setup(content, filepath, { api }) {
  // transform content like parse string to json or do anything you need.
  // returned key values will be passed to as 1st argument to render function
  return {}
}

// if no setup function exported, returned value will be merge into first argument. 
/**
 * @params {function} onSave. Call onSave when user want to save file content: onSave(newContent).
 * @params {function} onChange. Call onChange when user changed file content.
 * @params {string|unit8Array} content.
 * @params {object} setupReturnedValue.
 * @params {HTMLElement} rootElement. The root element that you can mount your editor.
 */
export function render({ onSave, onChange, content, ...setupReturnedValue}, rootElement) {
  // render your editor like:
  // render(<Editor />, rootElement)
}
```

### 3. Add `myeditorcool` field to package.json

```javascript
{
  ...
  "myeditorcool": {
    "entry": "", // string. path to your entry file.
    "extension": "", // string|[string]. supported file extension,
    "readAsText": true, // bool, optional. where read content as text,
    "emptyContent": "", // string, optional. used by myeditor.cool to create new file.
  }
}
```

## Publish

1. Publish your package to npm. When user install your package, myeditor.cool will read your package.json file to find entry file.
2. create a PR to [publicEditors.json](https://github.com/MyEditorCool/editors/blob/master/publicEditors.json) show you editor in myeditor.cool list.

## Preview

You can preview your editor use custom install:

1. Open Configuration in myeditor.cool
2. paste your package web cdn address. If you published package to npm, you can use `https://unpkg.com/{package.name}@{package.version}`.
3. you can also start a local file server to serve your package for local debugging. 

## Live code & Debug

If you are use vite as build tool, it is very easy to debug your local editor code follow the steps:
1. Find the url of the dir where your package.json exist. Usually your package.json is in root directory, you can visit it with `localhost:3000/package.json`.
2. Make Sure your myeditorcool child field `entry` pointed to the entry file.
3. Install the editor with the url in step 1.

Now, you can change or debug your local code without publish to npm. 
Notice, if you changed the content of myeditorcool field in package.json, you need to reinstall the package.  

Run [https://github.com/MyEditorCool/editors](https://github.com/MyEditorCool/editors) local debugging example. Follow the steps:
1. install dependencies in root directory.
2. run `npm start`
3. install example editor in myeditor.cool with address `http://localhost:3000/packages/test`
4. create a `1.test.json` file to see result.
 
