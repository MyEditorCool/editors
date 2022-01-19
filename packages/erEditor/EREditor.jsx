/**@jsx createElement */
import path from "path-browserify";
import {createElement, render as renderComponent, useRef, useImperativeHandle} from 'axii'
import { EREditor } from 'axii-x6'
import Shortcut from '@codexteam/shortcuts'
//export const test = /\.storage\.json$/

export const emptyContent = JSON.stringify({entities: [], relations: []})
export const extension = '.storage.json'

function isFieldFile(name) {
  return /\.field\.js$/.test(name)
}

export const readAsText = true

export async function setup(content, filePath, {api, dirs}) {
  const data = JSON.parse(content)
  const files = await api.readdir(path.join(dirs.cwd, path.dirname(filePath)))
  console.log(files)
  const customFields = []
  files.forEach(file => {
    if (isFieldFile(file)) {
      const [fieldName] = file.split('.')
      customFields.push(fieldName)
    }
  })

  return {
    data,
    customFields
  }
}

export function render({ data, customFields, onSave, ref }, root) {
  const editor = useRef()
  const onDataSave = (d) => onSave(JSON.stringify(d))
  if(ref) {
    useImperativeHandle(ref, () => ({
      getData: () => JSON.stringify(editor.current.getData())
    }))
  }
  renderComponent(<EREditor data={data} customFields={customFields} ref={editor} onSave={onDataSave}/>, root)
}

