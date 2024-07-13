import axios from 'axios'
import  { useState } from 'react'
import { useParams } from 'react-router-dom'

const Home = () => {
    const [todo,settodo] = useState("")
    const handleinputchange = (e) => {
        settodo(e.target.value)
    }
  const {id} = useParams();
  
    const addtodo = async(e) =>  {
        e.preventDefault();
        const response = await axios.post(
          `http://localhost:8080/todo/add/${id}`,
          { todo: todo },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
    }
  return (
    <div className="flex">
      <form onSubmit={addtodo}>
        <input
          type="text"
          placeholder="Enter Todo"
          name="todo"
          value={todo}
          onChange={handleinputchange} 
        />
        <button>add</button>
      </form>
    </div>
  );
}

export default Home