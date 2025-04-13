import React, { useEffect, useState } from 'react';
import { FaSignOutAlt , FaTrash } from 'react-icons/fa';
import '../styles/dashboard.css';
import AddTask from './AddTask';
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [error, setError]= useState('');
  const [name, setName] = useState('');
  const [showLogout, setShowLogout] = useState(false);

  const fetchTasks = async()=>{
    const token = localStorage.getItem('token');
    try{
      const res = await axios.get('https://task-manager-backend-6tyc.onrender.com/tasks',{
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

  const markAsCompleted = async(taskId)=>{
    const token = localStorage.getItem('token');
    try{
      await axios.put(`https://task-manager-backend-6tyc.onrender.com/tasks/${taskId}`,{
        completed:true,
      },{
        headers:{
          Authorization:`Bearer ${token}`,
        },
      });
      fetchTasks();
    }catch(error){
      console.error(error);
      alert('Failed to mark task as completed');
    }
  };

  const handleDelete= async(taskId)=>{
    const token = localStorage.getItem('token');
    if(!window.confirm('Are you sure you want to delete this task?')) return;
    try{
      await axios.delete(`https://task-manager-backend-6tyc.onrender.com/tasks/${taskId}`,{
        headers:{
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTasks();
    }catch(error){
      console.error(error);
      alert('Failed to delete task');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    window.location.href = '/';
  };

  useEffect(()=>{
    fetchTasks();
    const storedName = localStorage.getItem('username');
    if (storedName) {
    setName(storedName);
    }
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if(filter==='completed') return task.completed;
    if(filter==='in-progress')return !task.completed;
  });

  return (
    <>
      <div className='nav-bar'>
      <h2>Task Manager</h2>
      <div className='user-info'>
          <h4 onClick={() => setShowLogout(!showLogout)}>{`Hello, ${name}`}</h4>
          {showLogout && (
            <div className='logout-dropdown'>
              <button className='logout-button' onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>

      </div>
    <div className='dashboardContainer'>  
    <AddTask fetchTasks={fetchTasks} />
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
            <input className='checkbox' type='checkbox' onChange={()=> markAsCompleted(task.id)} title='Mark as completed'/>
          )}
          <FaTrash className='task-delete'onClick={()=>handleDelete(task.id)} title='delete'/>
          </div>
        </div>
      ))
    )}
  </div>
  </div>
    </div>
    </>
  )
}

export default Dashboard
