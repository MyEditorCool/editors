
import { loadJSON } from "../util.js";
import {writeFile, readdir} from 'fs/promises'
import path from 'path'

const DEFAULT_EDITOR = 'DefaultEditor'

// TODO 应该改成从 npm 读，这样服务器上才不用总是 pull 再更新
export async function createPredefinedEditorMap(editorsPath) {
  const editorNames = await readdir(editorsPath)
  const editors = []

  for(let editorName of editorNames) {
    if (editorName === DEFAULT_EDITOR) continue

    const pkg = await loadJSON(path.join(editorsPath, editorName, 'package.json'))
    editors.push({
      name: pkg.name,
      version: pkg.version,
      ...pkg.myeditorcool,
    })
  }

  // const editors = await loadAllFiles(editorsPath, /\.editor\.json$/)
  // return Object.entries(editors).map(([editorFileName, editor]) => {
  //   return {
  //     name: editorFileName,
  //     extension: editor.extension,
  //     emptyContent: editor.emptyContent
  //   }
  // })
  return editors
}


export async function generateDefaultEditors(editorsPath) {
  const data = await createPredefinedEditorMap(editorsPath)
  // 读取 dist/asset 目录
  return writeFile('defaultEditors.json', JSON.stringify(data, null, 4))
}

await generateDefaultEditors('./packages')
