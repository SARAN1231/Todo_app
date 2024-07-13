import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

const Home = () => {
  const [todo, setTodo] = useState("");
  const [data, setData] = useState([]);
  const [editTodo, setEditTodo] = useState(null); // Track which todo is being edited
  const { id } = useParams();

  useEffect(() => {
    getTodos();
  }, [id]);

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8080/todo/add/${id}`,
        { todo: todo },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      getTodos();
      setTodo(""); 
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const getTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/todo/get/${id}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleEditClick = (todo) => {
    setEditTodo(todo); // Set the todo to be edited
  };

  const handleUpdateTodo = async (updatedTodo) => {
    try {
      await axios.put(
        `http://localhost:8080/todo/update/${updatedTodo.id}`,
        { todo: updatedTodo.todo },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setEditTodo(null); // Close the edit popup
      getTodos(); // Refresh todos
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(`http://localhost:8080/todo/delete/${todoId}`);
      getTodos(); // Refresh todos
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Todo List</h2>
          <form onSubmit={addTodo} className="mb-6">
            <div className="flex items-center border-b border-teal-500 py-2">
              <input
                type="text"
                placeholder="Enter Todo"
                name="todo"
                value={todo}
                onChange={handleInputChange}
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
              <button
                type="submit"
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              >
                Add
              </button>
            </div>
          </form>
          <div>
            {data.map((todo, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 mb-2 bg-gray-100 rounded-md"
              >
                <p className="text-gray-700">{todo.todo}</p>
                <div className="flex items-center">
                  <FiEdit
                    className="text-blue-500 cursor-pointer mx-2"
                    onClick={() => handleEditClick(todo)}
                  />
                  <MdDeleteForever
                    className="text-red-500 cursor-pointer mx-2"
                    onClick={() => handleDeleteTodo(todo.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Edit Popup/Modal */}
      {editTodo && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Todo</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateTodo(editTodo);
              }}
            >
              <input
                type="text"
                placeholder="Edit Todo"
                name="editedTodo"
                value={editTodo.todo}
                onChange={(e) =>
                  setEditTodo({ ...editTodo, todo: e.target.value })
                }
                className="appearance-none bg-transparent border-b-2 border-teal-500 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
              <div className="mt-4 flex justify-end">
                <button
                 
                  className="bg-teal-500 hover:bg-teal-700 text-white py-1 px-4 rounded"
                >
                  Update
                </button>
                <button
                  className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-4 rounded"
                  onClick={() => setEditTodo(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
