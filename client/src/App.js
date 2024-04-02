import { useEffect, useState } from 'react';
import io from 'socket.io-client';  // https://socket.io/docs/v3/how-it-works/
import shortid from 'shortid';

const App = () => {
  const [socket, setSocket] = useState();
  const [tasks, setTasks] = useState([{id: '1', name: 'Shopping'}]);
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
      const socket = io('ws://localhost:8000', { transports: ['websocket'] });
      setSocket(socket);

      return () => {
        socket.disconnect();
      };
  }, []);

  const removeTask = (taskId) => {
    console.log('remove tasks: ', taskId);
    setTasks(tasks => tasks.filter(task => task.id !== taskId));
    socket.emit('removeTask', taskId);
  }

  const addTask = (newTask) => {
    setTasks(tasks => tasks.push(newTask));
//   setTasks(tasks => [...tasks, newTask]);
    console.log('Added new task: ', newTask, tasks);
  }

  const submitForm = (e) => {
    e.preventDefault();
    const newTask = {id: shortid(), name: taskName};
    addTask(newTask);
    setTaskName('');
    socket.emit('addTask', newTask);
  }

  return (
    <div className="App">
  
      <header>
        <h1>ToDoList.app</h1>
      </header>
  
      <section className="tasks-section" id="tasks-section">
        <h2>Tasks</h2>
  
        <ul className="tasks-section__list" id="tasks-list">
          {tasks.map(item => <li key={item.id} className="task"> {item.name}
                                <button className="btn btn--red" onClick={() => removeTask(item.id)}>Remove</button>
                              </li>)}          
        </ul>
  
        <form id="add-task-form" onSubmit={submitForm}>
          <input className="text-input"
                 autoComplete="off"
                 type="text"
                 placeholder="Type your description"
                 id="task-name"
                 value={taskName}
                 onChange={(e) => setTaskName(e.target.value)} />
          <button className="btn" type="submit">Add</button>
        </form>
  
      </section>
    </div>
  );
}

export default App;