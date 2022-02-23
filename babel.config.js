module.exports = {
    // 开启默认预设
    "presets": [
      [
        "@babel/env",
        {
          "modules": false  // 关闭 esm 转化，统一交由 rollup 处理，防止冲突
        }
      ]
    ],
    "plugins": [
      [
        // 开启 babel 各依赖联动，由此插件负责自动导入 helper 辅助函数，从而形成沙箱 polyfill 
        "@babel/plugin-transform-runtime",  
        {
          "corejs": { "version": 3, "proposals": true },
          "useESModules": true  // 关闭 esm 转化，交由 rollup 处理，同上防止冲突
        }
      ]
    ]
  }
  