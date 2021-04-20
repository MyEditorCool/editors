import Shortcut from "@codexteam/shortcuts";
import CodeMirror from 'codemirror'
import styleInject from 'style-inject'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/mode/htmlmixed/htmlmixed.js'
import 'codemirror/mode/jsx/jsx.js'
import 'codemirror/mode/xml/xml.js'
import baseCss from 'codemirror/lib/codemirror.css'
import draculaCss from 'codemirror/theme/dracula.css'
import overwriteCss from '../../DefaultEditor.less'

styleInject(baseCss)
styleInject(overwriteCss)
styleInject(draculaCss)

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

export async function render({ content = '', onSave, onChange, title = '' }, root) {


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


