import React from 'react'
import '../styles/dashboard.css'

const Dashboard = () => {
  return (
    <div className='dashboardContainer'>
    <div className='add-task'>
        <form>
            <h5>Add new task</h5>
            <input type='text' name='title' placeholder='Title' className='input-field'/>
            <textarea type='text' name='description' placeholder='description'className="textarea-field"/>
            <button className='submit-btn'>Submit</button>
        </form>
    </div>
    <div className='dashboard'>
      Hello
    </div>
    </div>
   
  )
}

export default Dashboard
