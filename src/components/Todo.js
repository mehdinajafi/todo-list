import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { AuthContext } from '../Auth/AuthContext'
import { doneTodo } from '../redux/actions'
import { importantTodo } from '../redux/actions'
import { deleteTodo } from '../redux/actions'
import fbase from '../firebase'
import starIcon from '../assets/images/icons/star.svg'
import importantIcon from '../assets/images/icons/important.svg'
import trashIcon from '../assets/images/icons/trash.svg'
import '../styles/components-styles/Todo.css'

const Todo = ({ todo, deleteTodo, doneTodo, importantTodo }) => {
  // Import AuthContext for currentUser's uid to update(completed,important) each user's todo using its own token.
  const { currentUser } = useContext(AuthContext)

  const handleDoneTodo = (todo) => {
    // Update todo.completed in redux's store and firebase database
    fbase
      .database()
      .ref(`/users/${currentUser.uid}/${todo.id}`)
      .update({ completed: !todo.completed })
    doneTodo(todo.id)
  }

  const handleImportantTodo = (todo) => {
    // Update todo.important in redux's store and firebase database
    fbase
      .database()
      .ref(`/users/${currentUser.uid}/${todo.id}`)
      .update({ important: !todo.important })
    importantTodo(todo.id)
  }

  const handleDeleteTodo = (todo) => {
    // remove todo of redux's store and firebase database
    fbase.database().ref(`/users/${currentUser.uid}/${todo.id}`).remove()
    deleteTodo(todo.id)
  }

  return (
    <li className="todo-item">
      <div className="todo-checkbox">
        <label className="checkbox-label">
          <input
            type="checkbox"
            onChange={handleDoneTodo.bind(this, todo)}
            checked={todo.completed}
          />
          <span className="checkbox-custom circular"></span>
        </label>
      </div>

      <span
        className={todo.completed ? 'todo-title todo-completed' : 'todo-title'}
      >
        {todo.title}
      </span>

      <div className="todo-options">
        <div
          onClick={handleImportantTodo.bind(this, todo)}
          className="important-todo"
        >
          {todo.important ? (
            <img src={importantIcon} alt="important" />
          ) : (
            <img src={starIcon} alt="notImportant" />
          )}
        </div>

        <div
          onClick={handleDeleteTodo.bind(this, todo)}
          className="delete-todo"
        >
          <img src={trashIcon} alt="delete" />
        </div>
      </div>
    </li>
  )
}

// export default Todo;
export default connect(null, { deleteTodo, doneTodo, importantTodo })(Todo)
