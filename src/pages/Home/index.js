import React from 'react'
import TaskInput from '../TaskInput'
import Navbar from '../../components/Navbar';
import './styles.css'

const Home = () => {
  return (
    <div className="home">
      <Navbar/>
      <div className="">
      <TaskInput/>
      </div>
    </div>
  )
}

export default Home
