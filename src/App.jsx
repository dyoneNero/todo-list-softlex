import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { addTodo } from './store/todoSlice';
import NewTodoForm from './components/NewTodoForm';
import TodoList from './components/TodoList';

import './App.css';
import axios from "axios";
import TodoItem from "./components/TodoItem";

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [res, setRes] = useState([username, email, text])
  const dispatch = useDispatch();

  axios
      .get('https://uxcandy.com/~shapoval/test-task-backend/v2?developer=Name')
      .then(function (response) {
        // handle success
          return setRes(response.data.message.tasks)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

  const handleAction = () => {
    if(text.trim().length) {
      dispatch(addTodo({res}));
      setText('');
      setUsername('')
      setEmail('')
    }
  }

  return (
    <div className='App'>
      <NewTodoForm
        value={username}
        updateText={setUsername}
        handleAction={handleAction}
      />
        <NewTodoForm
            value={email}
            updateText={setEmail}
            handleAction={handleAction}
        />
        <NewTodoForm
            value={text}
            updateText={setText}
            handleAction={handleAction}
        />
        <button onClick={handleAction}>Add todo</button>
        <ul>
            {res.map((todo) => (
                <TodoItem
                    key={todo.id}
                    {...todo}
                />
            ))}
        </ul>
    </div>
  );
}

export default App;
