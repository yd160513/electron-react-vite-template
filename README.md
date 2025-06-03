# Electron + React + Vite 项目模板

基于现代技术栈的跨平台桌面应用开发模板，集成 Electron、React 18 和 Vite 4。

## 技术栈
- 🚀 **前端框架**: React 18 (TypeScript)
- ⚡ **构建工具**: Vite 4
- 🖥️ **桌面运行时**: Electron 36
- 📦 **打包工具**: electron-builder 26
- 🔍 **代码规范**: ESLint 9 + TypeScript ESLint

## 功能特性
✅ 开发模式热重载 (HMR)  
✅ 主进程/渲染进程代码分离  
✅ 跨平台打包支持 (Windows/macOS/Linux)  
[x] 进程间通信预配置   
[x] 日志管理   
[x] 应用升级

## 快速开始
```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 打包应用程序
npm run build
```

## 代码解释
### vite.config.ts 中 electron 配置的 external 字段含义
```ts
electron({
  entry: 'electron/main.js',
  vite: {
    build: {
      outDir: 'dist-electron',
      rollupOptions: {
        external: ['electron']
      }
    }
  }
})
```
electron 模块属于 Node.js 环境特有的 API，在浏览器环境无法运行，通过 external 字段告诉 Rollup 不要将 electron 模块打包进最终的构建文件中，可以避免出现类似 require('electron') is not defined 的运行时错误。
1. 主进程代码 (electron/main.js) 会被编译到 dist-electron 目录
2. 渲染进程代码会被编译到 dist 目录
3. Electron 运行时环境会自动提供 electron 模块，不需要打包进最终产物