export const getTodosState = store => store.todos;

export const getTodosByFilters = (store, filter) => {
  const todos = getTodosState(store);

  switch (filter) {
    case "completed":
      return todos.filter(todo => todo.completed);
    case "incomplete":
      return todos.filter(todo => !todo.completed);
    case "all":
    default:
      return todos;
  }
};