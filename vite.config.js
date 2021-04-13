import path from 'path'

function makePath(relativePath) {
  return path.join(path.dirname(import.meta.url.replace('file:', '')), relativePath)
}

export default {
  esbuild: {
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment'
  },
  css: {
    preprocessorOptions: {
      less: { javascriptEnabled: true }
    }
  },
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
    lib: {
      entry: makePath('./index.js'),
      name: 'MyEditorCool',
      formats: ['es']
    },
    rollupOptions: {
      input: {
        DocEditor: makePath('./DocEditor.jsx'),
        EREditor: makePath('./EREditor.jsx'),
        SheetEditor: makePath('./SheetEditor.jsx'),
        TableEditor: makePath('./TableEditor.jsx'),
        ImageEditor: makePath('./ImageEditor.jsx'),
        CodeEditor: makePath('./CodeEditor.js')
      },
      output: {
        entryFileNames: '[name].js'
      }
    }
  }
}
