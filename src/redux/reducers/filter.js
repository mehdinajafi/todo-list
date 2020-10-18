const filter = (state = 'Inbox', action) => {
  switch (action.type) {
    case 'SET_FILTER': {
      return action.payload.filter
    }
    default: {
      return state
    }
  }
}

export default filter
