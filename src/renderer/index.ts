import * as ipcRenderer from './ipcRenderer.ts'

export default {
  testInvoke: (data: any) => {
    return ipcRenderer.invoke('test-invoke', data)
  },

  testSend: (msg: string) => {
    return ipcRenderer.send('test-send', msg)
  },

  testOn: (callback) => {
    return ipcRenderer.on('test-on', callback)
  }
}
