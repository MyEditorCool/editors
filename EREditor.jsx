/**@jsx createElement */
import path from "path-browserify";
import {createElement, useRef, render as renderComponent} from 'axii'
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

export function render({ data, customFields, onSave }, root) {
  const onDataSave = (d) => onSave(JSON.stringify(d))
  renderComponent(<EREditor data={data} customFields={customFields} onSave={onDataSave}/>, root)
}

