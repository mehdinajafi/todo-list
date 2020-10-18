import React, { useEffect, useContext } from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../redux/actions'
import { AuthContext } from '../Auth/AuthContext'
import fbase from '../firebase'
import '../styles/components-styles/Sidebar.css'

const Sidebar = ({ setFilter }) => {
  // AuthContext to sign out the user.
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    let lis = document.querySelectorAll('.sidebar-filter-li')
    lis.forEach((li) =>
      li.addEventListener('click', (e) => {
        // Remove the active class from the previous tag and add it to the new tag.
        lis.forEach((li) => li.classList.remove('active'))
        li.classList.add('active')

        // Change the color of the active tag.
        lis.forEach((li) => li.children[0].setAttribute('stroke', '#1B2E35'))
        let avtiveLi = document.querySelector('.active')
        avtiveLi.children[0].setAttribute('stroke', '#1555E0')

        // The sidebar closes when one of the filters is clicked.
        document.querySelector('#hamburger-btn-checkbox').checked = false
      })
    )
  }, [])

  return (
    <section className="sidebar">
      <input type="checkbox" id="hamburger-btn-checkbox" hidden />
      <label htmlFor="hamburger-btn-checkbox" className="hamburger-btn-label">
        <div className="hamburger-btn">
          <div className="hamburger-btn-line hamburger-btn-line-1"></div>
          <div className="hamburger-btn-line hamburger-btn-line-2"></div>
          <div className="hamburger-btn-line hamburger-btn-line-3"></div>
        </div>
        <span>Filters</span>
      </label>

      <div className="sidebar-content">
        <ul className="sidebar-filters">
          <li
            className="sidebar-filter-li active"
            onClick={() => setFilter('Inbox')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-inbox"
              width={40}
              height={40}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#1555E0"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <rect x={4} y={4} width={16} height={16} rx={2} />
              <path d="M4 13h3l3 3h4l3 -3h3" />
            </svg>
            <span className="sidebar-filter-title">Inbox</span>
          </li>
          <li className="sidebar-filter-li" onClick={() => setFilter('Today')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-calendar-event"
              width={40}
              height={40}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#1B2E35"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <rect x={4} y={5} width={16} height={16} rx={2} />
              <line x1={16} y1={3} x2={16} y2={7} />
              <line x1={8} y1={3} x2={8} y2={7} />
              <line x1={4} y1={11} x2={20} y2={11} />
              <rect x={8} y={15} width={2} height={2} />
            </svg>
            <span className="sidebar-filter-title">Today</span>
          </li>
          <li
            className="sidebar-filter-li"
            onClick={() => setFilter('Important')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-star"
              width={40}
              height={40}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#1B2E35"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
            </svg>
            <span className="sidebar-filter-title">Important</span>
          </li>
          <li
            className="sidebar-filter-li"
            onClick={() => setFilter('Completed')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-square-check"
              width={40}
              height={40}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#1B2E35"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <rect x={4} y={4} width={16} height={16} rx={2} />
              <path d="M9 12l2 2l4 -4" />
            </svg>
            <span className="sidebar-filter-title">Completed</span>
          </li>
          <li
            className="sidebar-filter-li"
            onClick={() => setFilter('Incomplete')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-square"
              width={40}
              height={40}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#1B2E35"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <rect x={4} y={4} width={16} height={16} rx={2} />
            </svg>
            <span className="sidebar-filter-title">Incomplete</span>
          </li>
        </ul>
        <div className="account-manager">
          <span>{currentUser.email}</span>
          <button
            onClick={() => fbase.auth().signOut()}
            className="signout-btn"
          >
            Sign out
          </button>
        </div>
      </div>
    </section>
  )
}

export default connect(null, { setFilter })(Sidebar)
