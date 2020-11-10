import { React, useState } from "react";

import "../App.css";
import ToDoList from "../components/ToDoList";

import FolderList from "../components/FolderList";


const Main = () => {
  const [view, setView] = useState("folders");
  const [folderName, setFolderName] = useState("");


  const enterFolder = (folderName) => {
    setFolderName(folderName);
    setView("items")
  }
  const exitFolder = () => {
    setView("folders")
  }
  return (
    <header className="App-header">
      {view === "folders" && <FolderList onFolder={enterFolder}/>}
      {view === "items" && <ToDoList onExit={exitFolder} folderName={folderName}/>}
    </header>
  );
};
export default Main;
