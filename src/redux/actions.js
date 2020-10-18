export const setTodos = (todos) => ({
  type: 'SET_TODO',
  payload: todos,
})

export const addTodo = (content) => ({
  type: 'ADD_TODO',
  payload: { content },
})

export const deleteTodo = (id) => ({
  type: 'DELETE_TODO',
  payload: { id },
})

export const doneTodo = (id) => ({
  type: 'DONE_TODO',
  payload: { id },
})

export const importantTodo = (id) => ({
  type: 'IMPORTANT_TODO',
  payload: { id },
})

export const setFilter = (filter) => ({
  type: 'SET_FILTER',
  payload: { filter },
})
