/**@jsx createElement */
import {createElement} from 'axii'
import ImageEditor from 'tui-image-editor'
import 'tui-image-editor/dist/tui-image-editor.min.css'
import Shortcut from "@codexteam/shortcuts";
import './ImageEditor.less'

const mimeTypeMap = {
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
}

export const extension = /\.png$|\.jpe?g$/


function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, {type:mime});
}

export async function render({ title, content, onSave }, root) {
  const ext = title.split('.').pop()
  const mimeType = mimeTypeMap[ext]

  const editor = new ImageEditor(root, {
    includeUI: {
      menuBarPosition: 'bottom',
      menu: ['crop', 'flip', 'rotate', 'draw', 'shape', 'icon', 'text', 'mask', 'filter']
    }
  })

  new Shortcut({
    name : 'CMD+S',
    on : document.body,
    callback: async (e) => {
      console.log(e)
      e.preventDefault()
      onSave(editor.toDataURL({format: ext}), true)
    }
  })


  if (content) {
    let file
    if (typeof content === 'string') {
      file = dataURLtoFile(content, title)
    } else if (content.data){
      // CAUTION 一定注意 File 的第一个参数是个 Array，里面的项是 data。
      file = new File([Uint8Array.from(content?.data || [])], title, {type:mimeType});
    }
    const sizeValue = await editor.loadImageFromFile(file, title)
    editor.ui.activeMenuEvent();
    editor.ui.resizeEditor({ imageSize: sizeValue });
    editor.clearUndoStack();
  }
}

// TODO 实现简单的 View
