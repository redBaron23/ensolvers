import "../App.css";
import ToDoList from "../components/ToDoList"

import FolderList from "../components/FolderList"


const Main = () => {
  return (
    <header className="App-header">
      <ToDoList />
      <FolderList/>
    </header>
  );
}
export default Main;
