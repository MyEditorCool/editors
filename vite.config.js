import path from 'path'

function makePath(relativePath) {
  return path.join(path.dirname(import.meta.url.replace('file:', '')), relativePath)
}

const PACKAGE_ROOT_PATH = makePath('../../engine/packages')
export default {
  esbuild: {
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment'
  },
  resolve: {
    alias: [
      {find: 'axii-components', replacement: path.resolve(PACKAGE_ROOT_PATH, './axii-components/src')},
      {find: 'axii-x6', replacement: path.resolve(PACKAGE_ROOT_PATH, './axii-x6/src')},
      {find: 'axii', replacement: path.resolve(PACKAGE_ROOT_PATH, './controller-axii/src')},
      {find: '@ariesate/are', replacement: path.resolve(PACKAGE_ROOT_PATH, './engine')},
    ],
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
