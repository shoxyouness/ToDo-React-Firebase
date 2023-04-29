import React, { useContext, useRef, useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import classes from "./ToDoListForm.module.css";
import ToDoContext from "../../store/todo-context";
const ToDoListForm = () => {
  const todoCtx = useContext(ToDoContext);
  const [inputIsValid, setInputIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(true);
  const inputRef = useRef();
  const inputChangeHandler = () => {
    if (inputRef.current.value.trim().length === 0) {
      setInputIsValid(false);
      setFormIsValid(false);
      return;
    }
    setInputIsValid(true);
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!inputIsValid) {
      setFormIsValid(false);
      inputRef.current.value = "";
      return;
    }
    setFormIsValid(true);
    todoCtx.addToDo({
      id: todoCtx.items.length + 1,
      title: inputRef.current.value,
    });
    setInputIsValid(false);

    inputRef.current.value = "";
  };
  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={classes.actions}>
        <Input
          placeholder="Write A New Task"
          ref={inputRef}
          onChange={inputChangeHandler}
          label={"ToDO"}
        />
        <Button type="submit"> Add Task</Button>
      </div>
      {!formIsValid && !inputIsValid && <p>You Need To Write SomeThing</p>}
    </form>
  );
};
export default ToDoListForm;
