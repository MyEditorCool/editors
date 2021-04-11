import { default as viteConfig } from './vite.config.js'
import path from 'path'

function makePath(relativePath) {
  return path.join(path.dirname(import.meta.url.replace('file:', '')), relativePath)
}

const PACKAGE_ROOT_PATH = makePath('../../engine/packages')

export default {
  ...viteConfig,
  resolve: {
    alias: [
      {find: 'axii-components', replacement: path.resolve(PACKAGE_ROOT_PATH, './axii-components/src')},
      {find: 'axii-x6', replacement: path.resolve(PACKAGE_ROOT_PATH, './axii-x6/src')},
      {find: 'axii', replacement: path.resolve(PACKAGE_ROOT_PATH, './controller-axii/src')},
      {find: '@ariesate/are', replacement: path.resolve(PACKAGE_ROOT_PATH, './engine')},
    ],
  },
}
