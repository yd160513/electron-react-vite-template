import { contextBridge } from 'electron'

// 暴露必要API给渲染进程
contextBridge.exposeInMainWorld('electron', {
    process: {
        platform: process.platform
    }
})