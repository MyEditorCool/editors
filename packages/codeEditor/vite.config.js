
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
      entry: './CodeEditor.js',
      name: 'CodeEditor',
      formats: ['es']
    }
  }
}
