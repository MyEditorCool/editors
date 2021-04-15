import {createElement} from 'axii'
import { emptyContent, render } from "./packages/docEditor/DocEditor.jsx";

const data = emptyContent

render({ data }, document.getElementById('root'))
