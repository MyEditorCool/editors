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
    lib: {
      entry: './SheetEditor.jsx',
      name: 'SheetEditor',
      formats: ['es']
    }
  }
}
