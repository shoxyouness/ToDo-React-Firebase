import ToDoList from "./components/ToDoList/ToDoList";
import ToDoListForm from "./components/toDolListForm/ToDoListForm";
import ToDoProvider from "./store/ToDoProvider";
import classes from "./App.module.css";
function App() {
  return (
    <div className={classes.main}>
      <h1>Get Things Done</h1>
      <ToDoProvider>
        <ToDoListForm />
        <ToDoList />
      </ToDoProvider>
    </div>
  );
}

export default App;
