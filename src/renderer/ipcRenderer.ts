// TODO: 日志模块
const logger = {
  log: (...args) => console.log(...args),
  error: (...args) => console.log(...args),
}

export const invoke = (channel, ...args) => {
  if (!window.electron) {
    throw new Error('Electron API not available')
  }

  logger.log(`[ICP-Renderer] Sending: ${channel}`, args)

  return window.electron.invoke(channel, ...args).then(response => {
    logger.log(`[ICP-Renderer] Received: ${channel}`, response)
    return response
  }).catch(error => {
    logger.error(`[ICP-Renderer] Error: ${channel}`, error)
    throw error
  })
}

export const send = (channel, ...args) => {
  if (!window.electron) {
    throw new Error('Electron API not available');
  }

  logger.log(`[IPC-Renderer] Sending (send): ${channel}`, args);
  window.electron.send(channel, ...args);
}

export const on = (channel, callback) => {
  if (!window.electron) {
    throw new Error('Electron API not available')
  }

  logger.log(`[IPC-Renderer] Listening: ${channel}`)

  return window.electron.on(channel, callback)
}
