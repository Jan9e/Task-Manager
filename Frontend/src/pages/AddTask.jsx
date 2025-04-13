import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({fetchTasks}) => {
    const [title, setTitle]= useState('');
    const [description, setDescription]= useState('');

    const handleSubmit =async(e)=>{
        e.preventDefault();
        const token = localStorage.getItem('token');
        try{
            const response = await axios.post('http://localhost:3000/tasks',{
                title,
                description
            },
        {
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });
        alert("Task Added successfully.");
        setTitle('');
        setDescription('');
        fetchTasks();
        }catch(error){
            console.error('Error:', error);
            alert(error.response?.data?.error || "Something went wrong");
        }
    };
  return (
    <div className='add-task'>
    <form onSubmit={handleSubmit}>
        <h5>Add new task</h5>
        <input type='text' 
        name='title' 
        placeholder='Title' 
        className='input-field'
        value={title}
         onChange={(e)=>setTitle(e.target.value)}/>
        <textarea type='text' name='description' 
        placeholder='description'
        className="textarea-field"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}/>
        <button type='submit' className='submit-btn'>Submit</button>
    </form>
</div>
  )
}

export default AddTask
