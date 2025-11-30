import React from 'react'
import Form from '../components/Form'
import Todos from '../components/Todos'
import AddTodo from '../components/AddTodo'

const Home = () => {
  return (
    <>
      <Form />
      <AddTodo />
      <Todos />
    </>
  )
}

export default Home