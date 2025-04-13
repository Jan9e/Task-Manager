import React from 'react'
import '../styles/dashboard.css'
import AddTask from './AddTask'

const Dashboard = () => {
  return (
    <div className='dashboardContainer'>
    <AddTask/>
    <div className='dashboard'>
      Hello
    </div>
    </div>
   
  )
}

export default Dashboard
