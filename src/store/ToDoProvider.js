import React, { useEffect, useReducer, useState, useCallback } from "react";
import { act } from "react-dom/test-utils";
import ToDoContext from "./todo-context";
const defaultTodoState = {
  items: [],
};

const todoReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItems = state.items.concat(action.item);

    return {
      items: updatedItems,
    };
  }
  if (action.type === "REMOVE") {
    const updatedItems = state.items.filter((item) => item.id != action.id);
    return {
      items: updatedItems,
    };
  }
  if (action.type === "EDIT") {
    let updatedItems = [...state.items];

    for (let i = 0; i < updatedItems.length; i++) {
      if (updatedItems[i].id == action.id) {
        updatedItems[i].title = action.newTitle;
      }
    }

    return {
      items: updatedItems,
    };
  }

  return defaultTodoState;
};

const ToDoProvider = (props) => {
  const [todoState, dispatchTodo] = useReducer(todoReducer, defaultTodoState);
  const [isLoaded, setIsLoaded] = useState(false);
  const addToDoData = async (item) => {
    fetch("https://todo-list-c3d3c-default-rtdb.firebaseio.com/todo.json", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const removeToDoData = async (id) => {
    const respone = await fetch(
      "https://todo-list-c3d3c-default-rtdb.firebaseio.com/todo.json"
    );
    const data = await respone.json();
    let deleltedItemKey;
    for (let key in data) {
      if (data[key].id == id) {
        deleltedItemKey = key;
      }
    }
    if (deleltedItemKey) {
      fetch(
        `https://todo-list-c3d3c-default-rtdb.firebaseio.com/todo/${deleltedItemKey}.json`,
        {
          method: "DELETE",
          headers: {
            "Context-Type": "application/json",
          },
        }
      );
    }
  };
  const updateToDoData = async (id, newTitle) => {
    const respone = await fetch(
      "https://todo-list-c3d3c-default-rtdb.firebaseio.com/todo.json"
    );
    const data = await respone.json();
    let updatedKey;
    for (let key in data) {
      if (data[key].id == id) {
        updatedKey = key;
      }
    }
    if (updatedKey) {
      fetch(
        `https://todo-list-c3d3c-default-rtdb.firebaseio.com/todo/${updatedKey}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({ id: id, title: newTitle }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  };
  const addToDoHandler = async (item) => {
    dispatchTodo({ type: "ADD", item: item });
    if (isLoaded) {
      addToDoData(item);
    }
  };
  const removeToDoHandler = async (id) => {
    dispatchTodo({ type: "REMOVE", id: id });
    removeToDoData(id);
  };
  const editToDOHandler = (id, newTitle) => {
    dispatchTodo({ type: "EDIT", id: id, newTitle: newTitle });
    updateToDoData(id, newTitle);
  };
  const toDoContext = {
    items: todoState.items,
    addToDo: addToDoHandler,
    removeToDo: removeToDoHandler,
    editToDo: editToDOHandler,
  };

  useEffect(() => {
    fetch("https://todo-list-c3d3c-default-rtdb.firebaseio.com/todo.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (let key in data) {
          toDoContext.addToDo({ id: data[key].id, title: data[key].title });
        }
      });

    setIsLoaded(true);
  }, []);

  return (
    <ToDoContext.Provider value={toDoContext}>
      {props.children}
      {!isLoaded && <p style={{ textAlign: "center" }}>Loading...</p>}
    </ToDoContext.Provider>
  );
};
export default ToDoProvider;
