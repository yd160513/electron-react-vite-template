import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import services from './renderer/index'

function App() {
  const [count, setCount] = useState(0)
  console.log('app component')
  const testIpcInvoke = () => {
    services.testInvoke('test').then((res) => {
      console.log('testIpc getAppInfo()', res)
    }).catch((err) => {
      console.log(err)
    })
  }

  const testSend = () => {
    services.testSend('test')
  }

  services.testOn((arg) => {
    console.log('testOn', arg)
  })

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div className="card">
        <button onClick={testIpcInvoke}>
          testIpcInvoke
        </button>
      </div>
      <div className="card">
        <button onClick={testSend}>
          testSend
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
