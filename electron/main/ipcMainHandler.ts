const { ipcMain } = require('electron')

const handlers = new Map()
const listeners = new Map()
const logger = console

/**
 * 注册业务处理请求（请求-响应模式）
 * @param channel - IPC 通道名
 * @param handler - 业务处理函数
 * @returns {Promise}
 */
export const handler = (channel, handler) => {
    if (handlers.has(channel)) {
        throw new Error(`handler ${channel} has already registered`)
    }

    // 添加日志埋点
    const wrappedHandler = async (...args) => {
        try {
            logger.log(`[IPC-Main] Received (handler): ${channel}`, args)
            const result = await handler(...args)
            logger.log(`[IPC-Main] Responded: ${result}`)
            return result
        } catch (error) {
            logger.error(`[IPC-Main] Error in ${channel}:`, error)
            throw error
        }
    }

    handlers.set(channel, wrappedHandler)
    ipcMain.handle(channel, handler)
}

/**
 * 注册事件监听器（单向通知模式）
 * @param {string} channel - IPC 通道名
 * @param {function} listener - 事件监听函数
 */
export const on = (channel, listener) => {
    if (listeners.has(channel)) {
        throw new Error(`handler ${channel} has already registered`)
    }

    // 添加日志埋点
    const wrappedListener = (event, ...args) => {
        try {
            logger.log(`[IPC-Main] Received (event): ${channel}`, args);
            listener(...args);
        } catch (error) {
            logger.error(`[IPC-Main] Error in event listener for ${channel}:`, error);
        }
    };

    listeners.set(channel, wrappedListener);
    ipcMain.on(channel, wrappedListener);
}

/**
 * 向渲染进程发送消息
 * @param {BrowserWindow} win - 目标窗口
 * @param {string} channel - 通道名
 * @param  {...any} args - 参数
 */
export const send = (win, channel, ...args) => {
    if (win && !win.isDestroyed()) {
        logger.log(`[IPC-Main] Sending: ${channel}`, args);
        win.webContents.send(channel, ...args);
    }
}
