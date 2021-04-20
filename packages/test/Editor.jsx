import {createElement, ref} from 'axii'

export default function Editor({onSave, onChange, content}) {
  const contentRef = ref(content)
  console.log(content, 1111)

  const save = () => {
    onSave(contentRef.value)
  }

  return <div>
    <input value={contentRef} onChange={e => contentRef.value = e.target.value}/>
    <button onClick={save}>Save</button>
  </div>
}
