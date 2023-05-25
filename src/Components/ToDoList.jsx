import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { motion } from "framer-motion";
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
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            To-Do List
          </motion.h1>
          <br />
          <div className="input_container">
            <input
              type="text"
              value={item}
              onChange={itemEvent}
              placeholder="Add an item"
            />
            <Button size="small" className="newBtn" onClick={listOfItems}>
              <AddIcon className="newBtn" />
            </Button>
          </div>

          <motion.ol layout>
            {newItem.map((val, index) => (
              <motion.div
                key={index}
                layout
                transition={{ duration: 0.3 }}
                className="list_style"
              >
                <motion.li
                  style={val.completed ? { textDecoration: "line-through" } : {}}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleComplete(index)}
                >
                  {val.text}
                </motion.li>
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleComplete(index)}
                >
                  <Button size="small" className="deleteIcon">
                    <DeleteForeverIcon className="deleteIcon" />
                  </Button>
                </motion.span>
              </motion.div>
            ))}
          </motion.ol>
        </div>
      </div>
    </>
  );
};

export default ToDoList;
