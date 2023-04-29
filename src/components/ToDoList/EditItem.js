import React, { useState } from "react";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";
import classes from './EditItem.module.css'
const EditItem = (props) => {
  const [editInput, setEditInput] = useState("");
  const [InputIsValid, setInputIsValid] = useState(true);
  const editInputChangeHandler = (event) => {
    setEditInput(event.target.value);
    if (event.target.value.trim() === "") {
      setInputIsValid(false);
      return;
    }
    setInputIsValid(true);
  };
  const saveInputHandler = () => {
    if (editInput.trim().length == 0) {
      setInputIsValid(false);
      setEditInput("");
      return;
    }
    props.onEdit(editInput);
    props.onClose();
  };
  return (
    <Modal onClose={props.onClose}>
      <div className={classes.container}>
        <h2>Change The Task Title</h2>
        <Input value={editInput} onChange={editInputChangeHandler} />
        {!InputIsValid && <p>You Need To Write SomeThing!</p>}
        <div>
          <Button onClick={saveInputHandler}>Save</Button>
          <Button onClick={props.onClose}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
};
export default EditItem;
