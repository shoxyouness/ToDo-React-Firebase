import React, { useContext, useState } from "react";
import classes from "./ToDoList.module.css";
import ToDoContext from "../../store/todo-context";
import EditItem from "./EditItem";
import { ReactComponent as EditSvg } from "../../assets/edit.svg";
import { ReactComponent as DeleteSvg } from "../../assets/delete.svg";
const ToDoList = () => {
  const todoCtx = useContext(ToDoContext);
  const [itemOnEdit, setItemOnEdit] = useState({
    edit: false,
    id: undefined,
  });

  const removeToDoHandler = (id) => {
    todoCtx.removeToDo(id);
  };
  const editHandler = (id) => {
    setItemOnEdit({
      edit: true,
      id: id,
    });
  };
  const closeEditHandler = () => {
    setItemOnEdit({ edit: false, id: undefined });
  };
  const onEditHandler = (editedInput) => {
    todoCtx.editToDo(itemOnEdit.id, editedInput);
  };
  return (
    <>
      {itemOnEdit.edit && (
        <EditItem onEdit={onEditHandler} onClose={closeEditHandler} />
      )}
      <ul className={classes.todoList}>
        {todoCtx.items.map((todo) => (
          <li key={todo.id} id={todo.id}>
            {todo.title}
            <div className={classes.actions}>
              <div
                className={classes.edit}
                onClick={() => {
                  editHandler(todo.id);
                }}
              >
                <EditSvg />
              </div>
              <div
                className={classes.remove}
                onClick={() => {
                  removeToDoHandler(todo.id);
                }}
              >
                <DeleteSvg />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
export default ToDoList;
