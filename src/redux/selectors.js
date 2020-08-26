export const getTodosState = store => store.todos;

export const getTodosByFilters = (store, filter) => {
  const todos = getTodosState(store);

  switch (filter) {
    case "Today":
      return todos.filter(todo => new Date(todo.reminder).getDay() === new Date().getDay());
    case "Completed":
      return todos.filter(todo => todo.completed);
    case "Incomplete":
      return todos.filter(todo => !todo.completed);
    case "Important":
      return todos.filter(todo => todo.important);
    case "Inbox":
    default:
      return todos;
  }
};