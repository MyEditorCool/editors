import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/mode/htmlmixed/htmlmixed.js'
import 'codemirror/mode/jsx/jsx.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/theme/dracula.css'
import 'codemirror/lib/codemirror.css'
import Shortcut from "@codexteam/shortcuts";
import './DefaultEditor.less'


function appendStyleSheet(href, attrs) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.href = href
    link.rel = 'stylesheet'
    link.onload = resolve
    link.onerror = reject
    document.body.appendChild(link)
  })
}

function appendScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.setAttribute('src', src)
    script.type= 'text/javascript'
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
  })
}

const extensionToLanguage = {
  '.js': 'javascript',
  '.jsx': 'jsx',
  '.ts': 'typescript',
  '.json': 'json',
  '.html': 'htmlmixed',
  '.xml': 'xml',
  '.css': 'css',
}

export const readAsText = true

export async function render({ content, onSave, onChange, title }, root) {


  const language = Object.entries(extensionToLanguage).find(([ext, value]) => {
    return title.slice(title.length - ext.length) === ext
  })

  const editor = CodeMirror(root, {
      value: content,
      mode: language ? language[1] : undefined,
      theme: "dracula",
    });


  new Shortcut({
    name : 'CMD+S',
    on : document.body,
    callback: async (e) => {
      e.preventDefault()
      onSave(editor.getValue())
    }
  })

}

