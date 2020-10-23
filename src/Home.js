import React from 'react'
import TodoList from './components/TodoList'
import Sidebar from './components/Sidebar'
import './Home.css'

const Home = () => {
  return (
    <main className="container">
      <Sidebar />
      <TodoList />
    </main>
  )
}

export default Home
