import { React, useState } from "react";

import "../App.css";
import ToDoList from "../components/ToDoList";
import LogIn from "../components/LoginForm";
import FolderList from "../components/FolderList";
import  ButtonAppBar  from "../components/ButtonAppBar";

const Main = () => {
  const [view, setView] = useState("folders");
  const [folderName, setFolderName] = useState("");

  const enterFolder = folderName => {
    setFolderName(folderName);
    setView("items");
  };
  const exitFolder = () => {
    setView("folders");
  };

  const logOut = () => {

    setView("login");
  }

  return (
    <div  >
      <ButtonAppBar onLogout={logOut} logged={view!=="login"} />
      <div>
        {view === "login" && <LogIn onLogin={exitFolder} />}
        {view === "folders" && <FolderList onFolder={enterFolder} />}
        {view === "items" && (
          <ToDoList onExit={exitFolder} folderName={folderName} />
        )}
      </div>
    </div>
  );
};
export default Main;
