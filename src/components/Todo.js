import React, { useContext } from "react";
import { connect } from "react-redux";
import { AuthContext } from "../Auth/AuthContext";
import { doneTodo } from "../redux/actions";
import { pinTodo } from "../redux/actions";
import { deleteTodo } from "../redux/actions";
import fbase from "../firebase";
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
            todo.pin ?
            <svg className="pin-todo-icon" version={1.0} xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#0067FF" stroke="none">
                <path d="M432 618 c-7 -7 -12 -20 -12 -29 0 -21 -103 -84 -152 -93 -19 -3 -43
                  -13 -54 -21 -18 -13 -25 -8 -101 68 -45 44 -86 78 -90 74 -4 -4 28 -43 71 -86
                  72 -72 77 -80 65 -99 -12 -20 -10 -26 29 -65 23 -23 42 -46 42 -51 0 -4 -50
                  -71 -111 -148 -60 -77 -109 -144 -107 -150 2 -5 70 43 152 107 l148 117 42
                  -41 c42 -41 69 -51 82 -30 4 7 39 -22 90 -72 46 -46 87 -80 91 -76 4 4 -30 45
                  -76 91 -83 83 -83 83 -68 112 8 16 17 41 21 56 12 51 75 146 98 150 45 6 32
                  37 -49 119 -44 43 -84 79 -89 79 -6 0 -15 -5 -22 -12z m165 -165 c-10 -9 -158
                  138 -150 150 3 5 40 -25 81 -66 42 -42 73 -80 69 -84z m-93 48 l58 -59 -21
                  -21 c-12 -12 -21 -24 -21 -28 0 -5 -11 -30 -25 -57 -14 -27 -25 -57 -25 -66 0
                  -9 -7 -25 -14 -36 -14 -18 -21 -13 -130 95 -63 63 -113 118 -110 122 2 4 20
                  13 40 19 34 12 36 11 90 -40 69 -65 85 -57 20 9 l-48 49 23 14 c13 8 40 25 59
                  36 19 12 37 22 40 22 3 0 32 -27 64 -59z m-190 -190 c79 -79 114 -121 106
                  -126 -8 -5 -54 35 -131 111 -104 104 -127 134 -101 134 4 0 61 -53 126 -119z
                  m-42 -28 c10 -9 18 -20 18 -24 0 -8 -185 -159 -195 -159 -6 0 147 198 154 199
                  3 1 13 -6 23 -16z" />
                <path d="M415 511 c-10 -17 12 -21 25 -6 10 12 10 15 -3 15 -9 0 -18 -4 -22 -9z" />
                <path d="M455 479 c-4 -6 -5 -13 -2 -16 7 -7 27 6 27 18 0 12 -17 12 -25 -2z" />
                <path d="M490 434 c0 -14 3 -14 15 -4 8 7 15 14 15 16 0 2 -7 4 -15 4 -8 0 -15 -7 -15 -16z" />
                <path d="M420 362 c0 -13 23 -32 39 -32 11 0 10 4 -4 20 -19 21 -35 26 -35 12z" />
              </g>
            </svg>
            :
            <svg className="pin-todo-icon" version={1.0} xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#0067FF" stroke="none">
                <path d="M432 618 c-7 -7 -12 -20 -12 -29 0 -21 -103 -84 -152 -93 -40 -7
                  -118 -60 -118 -79 0 -7 18 -31 40 -52 22 -21 40 -43 40 -48 0 -5 -50 -72 -111
                  -149 -60 -77 -109 -144 -107 -150 2 -5 70 43 152 107 l148 117 43 -42 c26 -26
                  50 -41 61 -38 23 4 61 60 74 110 17 63 77 156 102 160 45 6 32 37 -49 119 -44
                  43 -84 79 -89 79 -6 0 -15 -5 -22 -12z m165 -165 c-10 -9 -158 138 -150 150 3
                  5 40 -25 81 -66 42 -42 73 -80 69 -84z m-93 48 l58 -59 -21 -21 c-12 -12 -21
                  -25 -21 -30 0 -6 -9 -25 -19 -43 -11 -18 -25 -52 -31 -74 -7 -23 -23 -55 -36
                  -70 l-23 -29 -120 120 c-112 111 -119 120 -104 137 8 9 35 25 59 34 l44 17 56
                  -53 c69 -65 85 -57 20 9 l-48 49 23 14 c13 8 40 25 59 36 19 12 37 22 40 22 3
                  0 32 -27 64 -59z m-232 -218 c10 -9 18 -20 18 -24 0 -8 -185 -159 -195 -159
                  -6 0 147 198 154 199 3 1 13 -6 23 -16z" />
                <path d="M415 511 c-10 -17 12 -21 25 -6 10 12 10 15 -3 15 -9 0 -18 -4 -22
                -9z" />
                <path d="M455 479 c-4 -6 -5 -13 -2 -16 7 -7 27 6 27 18 0 12 -17 12 -25 -2z" />
                <path d="M490 434 c0 -14 3 -14 15 -4 8 7 15 14 15 16 0 2 -7 4 -15 4 -8 0
                -15 -7 -15 -16z" />
                <path d="M420 362 c0 -13 23 -32 39 -32 11 0 10 4 -4 20 -19 21 -35 26 -35 12z" />
              </g>
          </svg>
          }
        </div>

        <div onClick={handleDeleteTodo.bind(this, todo)} className="delete-todo">
          <svg className="delete-todo-icon" xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#F44336" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1={4} y1={7} x2={20} y2={7} />
            <line x1={10} y1={11} x2={10} y2={17} />
            <line x1={14} y1={11} x2={14} y2={17} />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
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
