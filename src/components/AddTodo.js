import React, { useState, useContext } from "react";
import { connect } from "react-redux";
import { AuthContext } from "../Auth/AuthContext";
import { addTodo } from "../redux/actions";
import { v4 as uuidv4 } from "uuid";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import fbase from "../firebase";
import "../styles/components-styles/AddTodo.css";

const AddTodo = ({ addTodo }) => {
  // Import AuthContext for currentUser's uid to save each user's todos using its own token.
  const {currentUser} = useContext(AuthContext)
  // The user (with the button below add-todo's input) decides whether to add a reminder or not.
  const [showDatePicker, setShowDatePicker] = useState(false)
  // This state is for save reminder by DateTimePicker.
  const [reminder, setReminder] = useState(null)

  const handleSubmitTodo = (e) => {
    e.preventDefault()
    // Get new todo information and save it.
    const [ inputTitleTodo ] = e.target.elements
    // If the title is empty alert error
    if(inputTitleTodo.value.trim().length === 0) {
      
      alert("Please enter your todo title")

    } else {

      const newTodo = {
        id: uuidv4(),
        title: inputTitleTodo.value,
        completed: false,
        pin: false,
        dateCreated: moment().valueOf(),
        reminder: !reminder ? null : moment(reminder).valueOf()
      }

      // Set new newTodo in firebase's database
      fbase.database().ref(`/users/${currentUser.uid}/${newTodo.id}`).set(newTodo)

      // addTodo save newTask in redux's store.
      addTodo(newTodo)
      // Return to normal.
      inputTitleTodo.value = ''
      setReminder(null)
      setShowDatePicker(false)

    }
  }

  // Handle show or hide DateTimePicker
  const handleShowDateTimePicker = () => {
    setShowDatePicker((showDatePicker) => !showDatePicker)
    // Set reminder's state empty when click
    setReminder(null)
  }

  return (
    <div className="addTodo">
      {/* Form for add new todo */}
      <form onSubmit={(e) => handleSubmitTodo(e)} className="addTodoForm">

        <input type='text' placeholder='Enter your todo and press enter' className="inputTitleTodo"/>

        <button type='submit' className="btnAddTodo">
          <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1={12} y1={5} x2={12} y2={19} />
            <line x1={5} y1={12} x2={19} y2={12} />
          </svg>
        </button>

      </form>


      <div className="addTodoOptions">
        {
          showDatePicker ?

          <div className="dateTimePicker">
            
            <DateTimePicker
            value={reminder}
            onChange={setReminder}/>

            <span onClick={handleShowDateTimePicker} className="dateTimePickerIcon">
              <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#0067FF" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <rect x={4} y={5} width={16} height={16} rx={2} />
                <line x1={16} y1={3} x2={16} y2={7} />
                <line x1={8} y1={3} x2={8} y2={7} />
                <line x1={4} y1={11} x2={20} y2={11} />
                <line x1={10} y1={16} x2={14} y2={16} />
              </svg>
            </span>
          </div> 
          : 
          <span onClick={handleShowDateTimePicker} className="dateTimePickerIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#0067FF" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
              <rect x={4} y={5} width={16} height={16} rx={2} />
              <line x1={16} y1={3} x2={16} y2={7} />
              <line x1={8} y1={3} x2={8} y2={7} />
              <line x1={4} y1={11} x2={20} y2={11} />
              <line x1={10} y1={16} x2={14} y2={16} />
              <line x1={12} y1={14} x2={12} y2={18} />
            </svg>
          </span>
        }

      </div>

    </div>
  );
}

export default connect(
  null,
  { addTodo }
)(AddTodo);