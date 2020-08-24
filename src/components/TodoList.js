import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { AuthContext } from "../Auth/AuthContext";
import { getTodosByFilters } from "../redux/selectors";
import { setTodos } from "../redux/actions";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import writeNewTodoIllustration from "../assets/images/illustrations/writeNewTodo.svg";
import fbase from "../firebase";
import "../styles/components-styles/TodoList.css";


const TodoList = ({ todos, filter, setTodos }) => {
  // Import AuthContext for currentUser's uid to get each user's todos using its own token.
  const { currentUser } = useContext(AuthContext)
  // When pending is true loading's gif appears in useEffect() this state it becomes false.
  const [pending, setPending] = useState(true)

  useEffect(() => {
    // Get data of firebase's database by user's token
    fbase.database().ref(`users/${currentUser.uid}/`).once('value')
      .then((data) => {
        const todoData = data.val()
        const todos = []
        // Push todoData(information is received from the database) to todos array
        for(const item in todoData) {
            todos.push({
                id: item, 
                title: todoData[item].title,
                completed: todoData[item].completed,
                pin: todoData[item].pin,
                dateCreated: todoData[item].dateCreated,
                reminder: todoData[item].reminder
            })
        }
        // And setTodos save todos in redux's store
        setTodos(todos)
        setPending(false)
      })
  }, [])

  return (
    <section className="add-and-show-todos">

      <AddTodo/>

      { todos.filter(todo => todo.pin).length !== 0 ?
        (
          <div className="pinned-todos">
            <h1 className="todos-title">Pinned</h1>
            <ul className="todo-list">
              {todos && todos.length
                ? todos.filter(i => i.pin).map((todo, index) => {
                    return <Todo key={`todo-${todo.id}`} todo={todo} />;
                  })
                : <img src={writeNewTodoIllustration} alt="No todos!" className="writeNewTodoIMG"/>}
            </ul>
          </div>
        ) : null
      }

      {
        pending 
          ? 
          <div className="loadingDiv">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: 'auto', background: 'rgb(255, 255, 255)', display: 'block', shapeRendering: 'auto', animationPlayState: 'running', animationDelay: '0s'}} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <path fill="none" stroke="#0067ff" strokeWidth={8} strokeDasharray="42.76482137044271 42.76482137044271" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" strokeLinecap="round" style={{transform: 'scale(0.8)', transformOrigin: '50px 50px', animationPlayState: 'running', animationDelay: '0s'}}>
              <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0;256.58892822265625" style={{animationPlayState: 'running', animationDelay: '0s'}} />
            </path>
          </svg>
          </div> 
          :       
          <div className="todos">
            <h1 className="todos-title">{filter}</h1>
            <ul className="todo-list">
              {todos && todos.length
                ? todos.filter(todo => !todo.pin).map((todo) => {
                    return <Todo key={`todo-${todo.id}`} todo={todo} />;
                  })
                : <img src={writeNewTodoIllustration} alt="No todos!" className="writeNewTodoIMG"/>}
            </ul>
          </div>
      }
    
    </section>
  )
}

const mapStateToProps = state => {
  // state return an object with two property Included : {todos, filter}
  const { filter } = state;
  // Filter todos by filter that selected check ./src/redux/selectors
  const todos = getTodosByFilters(state, filter);
  return { todos, filter };
};

export default connect(mapStateToProps, { setTodos })(TodoList);
