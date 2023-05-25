import React, { useState } from "react";
import { motion } from "framer-motion";
import todoimg from "../img/checklist.png";
import "./ToDoApp.css";
import AddIcon from "@material-ui/icons/AddRounded";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import { Alert } from "@mui/material";

const ToDoApp = () => {
  const [inputData, setInputData] = useState("");
  const [item, setItem] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const AddItem = () => {
    if (!inputData) {
      alert("Please add Item");
    } else {
      setItem([...item, { name: inputData, completed: false }]);
      setInputData("");
    }
  };

  // Delete item
  const deleteItem = (id) => {
    const updatedItems = item.map((elem, ind) => {
      if (ind === id) {
        return { ...elem, completed: !elem.completed };
      }
      return elem;
    });
    setItem(updatedItems);
  };

  // Remove all
  const removeAll = () => {
    setItem([]);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000); // Delay for 2 seconds (2000 milliseconds)
  };

  return (
    <motion.div
      className="main-div"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="alert-div">
        {showAlert && (
          <Alert
            className="alert"
            severity="success"
            onClose={() => setShowAlert(false)}
            sx={{ borderRadius: "50px" }}
          >
            All items deleted successfully!
          </Alert>
        )}
      </div>
      <div className="child-div">
        <figure>
          <img src={todoimg} alt="To-Do List" />
          <figcaption>Add Your List Here</figcaption>
        </figure>
        <div className="add-items">
          <div className="input-box">
            <input
              type="text"
              placeholder="Add Items..."
              value={inputData}
              onChange={(e) => {
                setInputData(e.target.value);
              }}
            />
            <motion.button
              className="add-btn"
              title="Add Item"
              onClick={AddItem}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AddIcon />
            </motion.button>
          </div>
        </div>
        <div className="show-items">
          {item.map((elem, ind) => {
            return (
              <motion.div
                className="each-item"
                key={ind}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 style={{ textDecoration: elem.completed ? "line-through" : "none" }}>{elem.name}</h3>
                <motion.button
                  className="del-btn"
                  title="Delete Item"
                  onClick={() => deleteItem(ind)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <DeleteIcon />
                </motion.button>
              </motion.div>
            );
          })}
        </div>
        <div className="show-items">
          <motion.button
            className="btn effect04"
            data-sm-link-text="Remove All"
            onClick={removeAll}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span>Check List</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ToDoApp;
