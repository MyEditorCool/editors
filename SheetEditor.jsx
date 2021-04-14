import Shortcut from "@codexteam/shortcuts";

export const extension = '.sheet.json'

function appendScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript';
    script.onload = resolve
    script.onError = reject
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script)
  })
}

function appendStylesheet(href) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = resolve
    link.onError = reject
    document.getElementsByTagName('head')[0].appendChild(link);
  })
}


export function setup(content) {
  const data = JSON.parse(content)
  return {
    data,
  }
}

export const readAsText = true

const defaultData = [
  // {
  //   "name": "Sheet0", //工作表名称
  //   "color": "", //工作表颜色
  //   "index": 0, //工作表索引
  //   "status": 1, //激活状态
  //   "order": 0, //工作表的下标
  //   "hide": 0,//是否隐藏
  //   "row": 36, //行数
  //   "column": 18, //列数
  //   "defaultRowHeight": 19, //自定义行高
  //   "defaultColWidth": 73, //自定义列宽
  //   "celldata": [], //初始化使用的单元格数据
  //   "config": {
  //     "merge":{}, //合并单元格
  //     "rowlen":{}, //表格行高
  //     "columnlen":{}, //表格列宽
  //     "rowhidden":{}, //隐藏行
  //     "colhidden":{}, //隐藏列
  //     "borderInfo":{}, //边框
  //     "authority":{}, //工作表保护
  //
  //   },
  //   "scrollLeft": 0, //左右滚动条位置
  //   "scrollTop": 315, //上下滚动条位置
  //   "luckysheet_select_save": [], //选中的区域
  //   "calcChain": [],//公式链
  //   "isPivotTable":false,//是否数据透视表
  //   "pivotTable":{},//数据透视表设置
  //   "filter_select": {},//筛选范围
  //   "filter": null,//筛选配置
  //   "luckysheet_alternateformat_save": [], //交替颜色
  //   "luckysheet_alternateformat_save_modelCustom": [], //自定义交替颜色
  //   "luckysheet_conditionformat_save": {},//条件格式
  //   "frozen": {}, //冻结行列配置
  //   "chart": [], //图表配置
  //   "zoomRatio":1, // 缩放比例
  //   "image":[], //图片
  //   "showGridLines": 1, //是否显示网格线
  //   "dataVerification":{} //数据验证配置
  // },
  {
    "name": "Sheet1",
    "color": "",
    "index": 1,
    "status": 0,
    "order": 1,
    "celldata": [],
    "config": {}
  }
]

export const emptyContent = JSON.stringify(defaultData)

export function render({ data, onSave, title }, root) {
  let sheetEditor
  Promise.all([
    appendStylesheet('https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/css/pluginsCss.css'),
    appendStylesheet('https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/plugins.css'),
    appendStylesheet('https://cdn.jsdelivr.net/npm/luckysheet/dist/css/luckysheet.css'),
    appendStylesheet('https://cdn.jsdelivr.net/npm/luckysheet/dist/assets/iconfont/iconfont.css'),
    appendScript('https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/js/plugin.js'),
    appendScript('https://cdn.jsdelivr.net/npm/luckysheet/dist/luckysheet.umd.js')
  ]).then(() => {
    // TODO 预存的数据
    console.log(title)
    sheetEditor = luckysheet.create({
      container: root.id,
      showinfobar: false,
      title,
      data: data.length ? data : defaultData
    })
    console.log(root.id)
  }).catch(e => {
    console.error(e)
  })

  new Shortcut({
    name : 'CMD+S',
    on : document.body,
    callback: async (e) => {
      e.preventDefault()
      onSave(JSON.stringify(luckysheet.getAllSheets()))
    }
  })
}
