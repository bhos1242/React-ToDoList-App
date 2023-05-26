import React, { useState } from "react";
import { motion } from "framer-motion";
import todoimg from "../img/checklist.png";
import "./ToDoApp.css";
import AddIcon from "@material-ui/icons/AddRounded";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import { Edit } from "@material-ui/icons";
import { Alert } from "@mui/material";

const ToDoApp = () => {
  const [inputData, setInputData] = useState("");
  const [item, setItem] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert("Please add an item");
    } else {
      if (editingItem !== null) {
        const updatedItems = item.map((elem, ind) => {
          if (ind === editingItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        });
        setItem(updatedItems);
        setInputData("");
        setEditingItem(null);
      } else {
        setItem([...item, { name: inputData, completed: false }]);
        setInputData("");
      }
    }
  };

  const deleteItem = (id) => {
    const updatedItems = item.filter((_, ind) => ind !== id);
    setItem(updatedItems);
  };

  const editItem = (elem, id) => {
    setInputData(elem.name);
    setEditingItem(id);
  };

  const removeAll = () => {
    setItem([]);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
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
              title={editingItem !== null ? "Edit Item" : "Add Item"}
              onClick={addItem}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {editingItem !== null ? <Edit /> : <AddIcon />}
            </motion.button>
          </div>
        </div>
        <div className="show-items">
          {item.map((elem, ind) => (
            <motion.div
              className="each-item"
              key={ind}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3
                style={{
                  textDecoration: elem.completed ? "line-through" : "none",
                }}
              >
                {elem.name}
              </h3>
              <div className="menu-btn">
                <motion.button
                  className="del-btn"
                  title="Edit Item"
                  onClick={() => editItem(elem, ind)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Edit />
                </motion.button>
                <motion.button
                  className="del-btn"
                  title="Delete Item"
                  onClick={() => deleteItem(ind)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <DeleteIcon />
                </motion.button>
              </div>
            </motion.div>
          ))}
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
