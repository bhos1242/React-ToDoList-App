import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import "./ToDoList.css";

const ToDoList = () => {
  const [item, setItem] = useState("");
  const [newItem, setNewItem] = useState([]);

  const itemEvent = (e) => {
    setItem(e.target.value);
  };

  const listOfItems = () => {
    if (item.trim() !== "") {
      setNewItem((prevItems) => [
        ...prevItems,
        { text: item, completed: false },
      ]);
      setItem("");
    }
  };

  const toggleComplete = (index) => {
    setNewItem((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        completed: !updatedItems[index].completed,
      };
      return updatedItems;
    });
  };

  return (
    <>
      <div className="main_div">
        <div className="center_div">
          <br />
          <h1>To-Do List</h1>
          <br />
          <div className="input_container">
            <input
              type="text"
              value={item}
              onChange={itemEvent}
              placeholder="Add an item"
            />
            <Button size="small" className="newBtn" onClick={listOfItems}>
              <AddIcon className="newBtn"/>
            </Button>
          </div>

          <ol>
            {newItem.map((val, index) => (
              <div className="list_style" key={index}>
                <li
                  style={val.completed ? { textDecoration: "line-through" } : {}}
                >
                  {val.text}
                </li>
                <span onClick={() => toggleComplete(index)}>
                  <Button size="small" className="deleteIcon">
                    <DeleteForeverIcon className="deleteIcon" />
                  </Button>
                </span>
              </div>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default ToDoList;
