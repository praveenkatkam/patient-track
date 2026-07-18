import { useState } from 'react'

function TestPage() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  return (
    <div className="page">
      <h1>Test Page</h1>
      <p>This is a simple React test page to confirm your app is working.</p>

      <section className="card">
        <h2>Counter test</h2>
        <p>Current count: <strong>{count}</strong></p>
        <div className="button-row">
          <button onClick={() => setCount(count - 1)}>-</button>
          <button onClick={() => setCount(0)}>Reset</button>
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
      </section>

      <section className="card">
        <h2>Input test</h2>
        <input
          type="text"
          placeholder="Type your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {name && <p>Hello, {name}! 👋</p>}
      </section>

      <footer>
        <p>Built with React + Vite</p>
      </footer>
    </div>
  )
}

export default TestPage
