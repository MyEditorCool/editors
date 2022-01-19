import { render, useRef, createElement } from 'axii'
import { render as renderEditor, emptyContent, setup } from "./packages/sheetEditor/SheetEditor";

render(createElement(function() {
    const editor = useRef()

    renderEditor({...setup(emptyContent), ref: editor}, document.getElementById('root'))
    
    return <button onClick={() => {
        console.log(editor.current.getData())
    }}>Save</button>
    
}), document.getElementById('root'))
