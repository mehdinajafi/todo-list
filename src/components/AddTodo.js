import React, { useState, useContext } from 'react'
import { connect } from 'react-redux'
import { AuthContext } from '../Auth/AuthContext'
import { addTodo } from '../redux/actions'
import { v4 as uuidv4 } from 'uuid'
import DateTimePicker from 'react-datetime-picker'
import moment from 'moment'
import fbase from '../firebase'
import plusIcon from '../assets/images/icons/plus.svg'
import calendarMinusIcon from '../assets/images/icons/calendar-minus.svg'
import calendarPlusIcon from '../assets/images/icons/calendar-plus.svg'
import '../styles/components-styles/AddTodo.css'

const AddTodo = ({ addTodo }) => {
  // Import AuthContext for currentUser's uid to save each user's todos using its own token.
  const { currentUser } = useContext(AuthContext)
  // The user (with the button below add-todo's input) decides whether to add a reminder or not.
  const [showDatePicker, setShowDatePicker] = useState(false)
  // This state is for save reminder by DateTimePicker.
  const [reminder, setReminder] = useState(null)

  const handleSubmitTodo = (e) => {
    e.preventDefault()
    // Get new todo information and save it.
    const [inputTitleTodo] = e.target.elements
    // If the title is empty alert error
    if (inputTitleTodo.value.trim().length === 0) {
      alert('Please enter your todo title')
    } else {
      const newTodo = {
        id: uuidv4(),
        title: inputTitleTodo.value,
        completed: false,
        important: false,
        dateCreated: moment().valueOf(),
        reminder: !reminder ? null : moment(reminder).valueOf(),
      }

      // Set new newTodo in firebase's database
      fbase
        .database()
        .ref(`/users/${currentUser.uid}/${newTodo.id}`)
        .set(newTodo)

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
        <input
          type="text"
          placeholder="Enter your todo and press enter"
          className="inputTitleTodo"
        />
        <button type="submit" className="btnAddTodo">
          <img src={plusIcon} alt="Add" />
        </button>
      </form>

      <div className="addTodoOptions">
        {showDatePicker ? (
          <div className="dateTimePicker">
            <DateTimePicker value={reminder} onChange={setReminder} />

            <span
              onClick={handleShowDateTimePicker}
              className="dateTimePickerIcon"
            >
              <img src={calendarMinusIcon} alt="remove reminder" />
            </span>
          </div>
        ) : (
          <span
            onClick={handleShowDateTimePicker}
            className="dateTimePickerIcon"
          >
            <img src={calendarPlusIcon} alt="Add reminder" />
          </span>
        )}
      </div>
    </div>
  )
}

export default connect(null, { addTodo })(AddTodo)
