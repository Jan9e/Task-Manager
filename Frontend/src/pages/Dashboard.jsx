import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/dashboard.css';
import AddTask from './AddTask';
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [error, setError]= useState('');
  const fetchTasks = async()=>{
    const token = localStorage.getItem('token');
    try{
      const res = await axios.get('http://localhost:3000/tasks',{
        headers:{
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data.tasks);
    }catch(error){
      console.error(error);
      setError('Failed to fetch tasks');
    }
  };
  useEffect(()=>{
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if(filter==='completed') return task.completed;
    if(filter==='in-progress')return !task.completed;
  });

  return (
    <div className='dashboardContainer'>
    <AddTask/>
    <div className='dashboard'>
    <h2 className='dashboard-header'>Your Tasks</h2>

<div className="tab-buttons">
  <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
  <button className={filter === 'in-progress' ? 'active' : ''} onClick={() => setFilter('in-progress')}>In Progress</button>
  <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
</div>

  {error && <p className='error'>{error}</p>}
  <div className='task-list'>
    {filteredTasks.length === 0 ? (
      <p>No tasks found</p>
    ): (
      filteredTasks.map(task=>(
        
          <div key={task.id} className='task-cards'>
          <div  className='task-details'>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Status: <strong>{task.completed ? 'Completed': 'In progress'}</strong></p>
          </div>
          <div className='task-actions'>
          {filter === 'in-progress' && (
            <input className='checkbox' type='checkbox'/>
          )}
          <FaEdit className='task-edit'/>
          <FaTrash className='task-delete'/>
          </div>
        </div>
      ))
    )}
  </div>
  </div>
    </div>
  )
}

export default Dashboard
