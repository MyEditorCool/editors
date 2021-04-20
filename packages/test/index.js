import {createElement, render as renderComponent} from 'axii'
import Editor from './Editor.jsx'

export const readAsText = true

export function render(props, root) {
  renderComponent(createElement(Editor, props), root)
}