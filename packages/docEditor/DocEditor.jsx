/**@jsx createElement */
import {createElement, useRef, render as renderComponent, useImperativeHandle} from 'axii'
import Editorjs from 'axii-components/dist/editorjs/index.js'
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

export function render({ data, onSave, onChange, ref }, root) {
  const editor = useRef()
  const tools = {
    image: {
      class: Editorjs.ImageEditorPlugin,
      config: {
        inline: true,
      }
    },
    table: {
      class: Editorjs.TablePlugin
    }
  }
  
  if(ref) {
    useImperativeHandle(ref, () => ({
      getData: async () => JSON.stringify(await editor.current.save())
    }))
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
      <Editorjs tools={tools} data={data} ref={editor} onChange={onChange} placeholder="Write down your ideas..."/>
    </div>

  ), root)
}
