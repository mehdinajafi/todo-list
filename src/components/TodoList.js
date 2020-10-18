import React, { useContext, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { AuthContext } from '../Auth/AuthContext'
import { getTodosByFilters } from '../redux/selectors'
import { setTodos } from '../redux/actions'
import loadingGif from '../assets/images/gifs/loading.svg'
import Todo from './Todo'
import AddTodo from './AddTodo'
import writeNewTodoIllustration from '../assets/images/illustrations/writeNewTodo.svg'
import fbase from '../firebase'
import '../styles/components-styles/TodoList.css'

const TodoList = ({ todos, filter, setTodos }) => {
  // Import AuthContext for currentUser's uid to get each user's todos using its own token.
  const { currentUser } = useContext(AuthContext)
  // When pending is true loading's gif appears in useEffect() this state it becomes false.
  const [pending, setPending] = useState(true)

  useEffect(() => {
    // Get data of firebase's database by user's token
    fbase
      .database()
      .ref(`users/${currentUser.uid}/`)
      .once('value')
      .then((data) => {
        const todoData = data.val()
        const todos = []
        // Push todoData(information is received from the database) to todos array
        for (const item in todoData) {
          todos.push({
            id: item,
            title: todoData[item].title,
            completed: todoData[item].completed,
            important: todoData[item].important,
            dateCreated: todoData[item].dateCreated,
            reminder: todoData[item].reminder,
          })
        }
        // And setTodos save todos in redux's store
        setTodos(todos)
        setPending(false)
      })
  }, [currentUser, setTodos])

  const sortedTodos = (todos, filter) => {
    if (filter === 'Today') {
      todos.sort((a, b) => a.reminder - b.reminder)
    } else {
      todos.sort((a, b) => b.dateCreated - a.dateCreated)
    }
    return todos
  }

  return (
    <section className="add-and-show-todos">
      <AddTodo />
      {pending ? (
        <div className="loadingDiv">
          <img src={loadingGif} alt="loading..." />
        </div>
      ) : (
        <div className="todos">
          <h1 className="todos-title">{filter}</h1>
          <ul className="todo-list">
            {todos && todos.length ? (
              sortedTodos(todos, filter).map((todo) => {
                return <Todo key={`todo-${todo.id}`} todo={todo} />
              })
            ) : (
              <img
                src={writeNewTodoIllustration}
                alt="No todos!"
                className="writeNewTodoIMG"
              />
            )}
          </ul>
        </div>
      )}
    </section>
  )
}

const mapStateToProps = (state) => {
  // state return an object with two property Included : {todos, filter}
  const { filter } = state
  // Filter todos by filter that selected check ./src/redux/selectors
  const todos = getTodosByFilters(state, filter)
  return { todos, filter }
}

export default connect(mapStateToProps, { setTodos })(TodoList)
