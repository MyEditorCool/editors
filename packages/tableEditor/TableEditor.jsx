/**@jsx createElement */
import {createElement, useRef, render as renderComponent} from 'axii'
import ToastGrid from 'axii-components/dist/toastGrid/index.js'

const extension = '.table.json'

export const readAsText = true

export const emptyContent = '[]'

export async function setup(content) {
  const data = JSON.parse(content)
  return {
    data,
  }
}

export function render({ data: tables }, root) {
  const editor = useRef()
  const save = () => {
    console.log('不能 save，这是个生成的文件')
  }
  const maxColumnLength = Math.max(...tables.map(t => t.columns.length))
  const columns = [{header: 'Table', name: 'name', minWidth: 200, whiteSpace: 'nowrap',}].concat(
    Array(maxColumnLength).fill(null).map((_, index) => ({
      header: `Column_${index}`,
      name:`column_${index}`,
      whiteSpace: 'pre-line',
    }))
  )

  const data = tables.map(table => ({
    name: table.name,
    ...table.columns.reduce((result, currentColumn, index) =>{
      return {
        ...result,
        [`column_${index}`]: `${currentColumn.name}\n[${currentColumn.type}]\n`
      }
    }, {})
  }))


  renderComponent (
    <div>
      <button onClick={save}>保存</button>
      <ToastGrid
        ref={editor}
        data={data}
        columns={columns}
        header={{align: 'left'}}
        scrollX={false}
        columnOptions={{resizable: true}}
      />
    </div>,
    root
  )
}
