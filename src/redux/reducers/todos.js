export default function (state = [], action) {
  switch (action.type) {
    case 'SET_TODO':
      return action.payload
    case 'ADD_TODO':
      const { content } = action.payload
      return state.concat(content)
    case 'DELETE_TODO':
      const { id } = action.payload
      return state.filter((todo) => todo.id !== id)
    case 'DONE_TODO':
      let indexForDone = state.findIndex((i) => i.id === action.payload.id)
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !state[indexForDone].completed }
          : todo
      )
    case 'IMPORTANT_TODO':
      let indexForImportant = state.findIndex((i) => i.id === action.payload.id)
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, important: !state[indexForImportant].important }
          : todo
      )
    default:
      return state
  }
}
