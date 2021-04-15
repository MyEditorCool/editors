
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
      entry: './ImageEditor.jsx',
      name: 'ImageEditor',
      formats: ['es']
    }
  }
}
