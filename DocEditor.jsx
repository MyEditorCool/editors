/**@jsx createElement */
import {createElement, useRef, render as renderComponent} from 'axii'
import { Editorjs } from 'axii-components'
import imageEditorPlugin from 'axii-components/editorjs/imageEditorPlugin.jsx'
import Shortcut from '@codexteam/shortcuts'

export const extension = '.doc.json'
export const emptyContent = JSON.stringify({blocks: [{ type: 'paragraph', data: {text: ''}}]})

export function setup(content) {
  const data = JSON.parse(content)
  return {
    data,
  }
}

export const readAsText = true

export function render({ data, onSave, onChange }, root) {
  const editor = useRef()
  const tools = {
    image: {
      class: imageEditorPlugin,
      config: {
        inline: true,
      }
    }
  }

  new Shortcut({
    name : 'CMD+S',
    on : document.body,
    callback: async (e) => {
      e.preventDefault()
      onSave(JSON.stringify(await editor.current.save()))
    }
  })

  renderComponent((
    <div block block-height='100%' block-overflow-y-auto style={{background:'#fff'}}>
      <Editorjs tools={tools} data={data} ref={editor} onChange={onChange} placeholder="写下你的灵感"/>
    </div>

  ), root)
}
