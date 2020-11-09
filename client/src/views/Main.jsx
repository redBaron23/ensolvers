import logo from "../logo.svg";
import "../App.css";
import ToDoItem from "../components/ToDoItem"
const Main = () => {
  return (
    <header className="App-header">
      <ToDoItem />
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  );
}
export default Main;
