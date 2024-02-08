import { useState } from 'react'
import Navbar from './components/Navbar'
import Verifycertificate from './components/Verifycertificate'
import Router from './components/Router'
import { Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router />
    </>
  )
}

export default App
