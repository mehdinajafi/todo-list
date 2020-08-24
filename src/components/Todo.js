import React, { useContext } from "react";
import { connect } from "react-redux";
import { AuthContext } from "../Auth/AuthContext";
import { doneTodo } from "../redux/actions";
import { pinTodo } from "../redux/actions";
import { deleteTodo } from "../redux/actions";
import fbase from "../firebase";
import unPinIcon from "../assets/images/icons/unpin.svg";
import pinIcon from "../assets/images/icons/pin.svg";
import trashIcon from "../assets/images/icons/trash.svg";
import "../styles/components-styles/Todo.css";

const Todo = ({ todo, deleteTodo, doneTodo, pinTodo }) => {
  // Import AuthContext for currentUser's uid to update(completed,pin) each user's todo using its own token.
  const { currentUser } = useContext( AuthContext )

  const handleDoneTodo = (todo) => {
    // Update todo.completed in redux's store and firebase database
    fbase.database().ref(`/users/${currentUser.uid}/${todo.id}`).update({ completed: !todo.completed })
    doneTodo(todo.id)
  }

  const handlePinTodo = (todo) => {
    // Update todo.pin in redux's store and firebase database
    fbase.database().ref(`/users/${currentUser.uid}/${todo.id}`).update({ pin: !todo.pin })
    pinTodo(todo.id)
  }

  const handleDeleteTodo = (todo) => {
    // remove todo of redux's store and firebase database
    fbase.database().ref(`/users/${currentUser.uid}/${todo.id}`).remove()
    deleteTodo(todo.id)
  }

  return (
    <li className="todo-item" >

      <div className="todo-checkbox">
        <label className="checkbox-label">
                <input type="checkbox" onChange={handleDoneTodo.bind(this, todo)} checked={todo.completed}/>
                <span className="checkbox-custom circular"></span>
        </label>
      </div>

      <span className={todo.completed ? "todo-title todo-completed" : "todo-title"}>
        {todo.title}
      </span>

      <div className="todo-options">
        <div onClick={handlePinTodo.bind(this, todo)} className="pin-todo">
          {
            todo.pin 
            ? <img src={unPinIcon} alt="unpin"/>
            : <img src={pinIcon} alt="pin"/>
          }
        </div>

        <div onClick={handleDeleteTodo.bind(this, todo)} className="delete-todo">
          <img src={trashIcon} alt="delete"/>
        </div>
      </div>

    </li>
  )
}

// export default Todo;
export default connect(
  null,
  { deleteTodo, doneTodo, pinTodo }
)(Todo);
