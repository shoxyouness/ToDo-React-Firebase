import React from "react";

const ToDoContext = React.createContext({
  items: [],
  addToDo: (item) => {},
  removeToDo: (id) => {},
  editToDo:(id)=>{},
});
export default ToDoContext;
