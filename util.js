import path from "path";
import { readFile, readdir } from 'fs/promises'


export function indexBy (arr = [], field) {
  return arr.reduce((result, item) => {
    return {
      ...result,
      [item[field]]: item
    }
  }, {})
}

export function cloneDeep(item) {
  return JSON.parse(JSON.stringify(item))
}

export function filter(obj, fn) {
  return Object.entries(obj).reduce((result, [key, value]) => {
    return fn(value, key) ? {...result, [key]: value} :  result
  }, {})
}

export function pick(obj, keys) {
  return filter(obj, (value, key) => keys.includes(key))
}

export function hasValue(obj) {
  return Object.keys(obj).length
}

export function set(obj, path, value) {
  let base = obj
  // CAUTION 注意这里用了 pop，刚好分成前后两段
  const parentPath = Array.isArray(path) ? path.slice(0): path.split('.')
  const fieldName = parentPath.pop()
  parentPath.forEach((p, i) => {
    if (base[p] === undefined ) base[p] = {}
    base = base[p]
  })
  base[fieldName] = value
}

export function get(obj, path) {
  let base = obj
  const pathArr = Array.isArray(path) ? path.slice(0): path.split('.')
  for(let p of pathArr) {
    if (base[p] === undefined) return undefined
    base = base[p]
  }
  return base
}

export function now() {
  return Math.floor(Date.now()/1000)
}

export function capitalize(name) {
  return `${name[0].toUpperCase()}${name.slice(1)}`
}

export function reverseCapital(name) {
  return `${name[0].toLowerCase()}${name.slice(1)}`
}

export async function loadAllFiles(dir, test, fs = { readFile, readdir }) {
  const result = {}
  const files = await fs.readdir(dir)
  for(let file of files) {
    const indexName = file.split('.')[0]
    const filePath = path.join(dir, file)
    if (test && !test.test(filePath)) continue

    let config
    if (/\.json$/.test(filePath)) {
      config = await loadJSON(filePath)
    } else if (/\.js$/.test(filePath)) {
      config = await import(filePath)
    } else if (/\.jsx$/.test(filePath)) {
      // console.log(1111, filePath)
      // config = importJsx(filePath)
      config = require(filePath)
    }
    // 由于 nodejs export default 出来会在 default 下
    result[indexName] = config.default ? config.default : config
  }
  return result
}

export async function loadJSON(userPath, fs = { readFile }) {
  return JSON.parse(await fs.readFile(new URL(userPath, import.meta.url)))
}

export function splitPath(inputPath) {
  const arr = inputPath.split('/')
  const current = arr.pop()
  return [arr.join('/'), current, arr]
}