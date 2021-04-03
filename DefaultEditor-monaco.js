import Shortcut from "@codexteam/shortcuts";

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
  '.jsx': 'javascript',
  '.ts': 'typescript',
  '.json': 'json',
  '.html': 'html',
  '.xml': 'xml',
  '.css': 'css',
}

export const readAsText = true

export async function render({ content, onSave, onChange, title }, root) {
  await appendStyleSheet('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs/editor/editor.main.min.css')
  await appendScript('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs/loader.min.js')
  console.log("aaaaascript loading")
  require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs' }});
  window.MonacoEnvironment = { getWorkerUrl: () => proxy };
  let proxy = URL.createObjectURL(new Blob([`
    self.MonacoEnvironment = {
        baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min'
    };
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs/base/worker/workerMain.min.js');
`], { type: 'text/javascript' }));


  const language = Object.entries(extensionToLanguage).find(([ext, value]) => {
    return title.slice(title.length - ext.length) === ext
  })

  const editor = window.monaco.editor.create(root, {
      value: content,
      language: language ? language[1] : undefined,
      theme: "vs-dark",
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


