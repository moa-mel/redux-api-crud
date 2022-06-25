import React, {useState} from 'react'
import './styles.css'
import {MdOutlineDelete} from "react-icons/md"
 import {GrFormAdd, GrFormEdit} from 'react-icons/gr';
 import {TbSelector} from 'react-icons/tb';
 import {BsFilterSquare} from 'react-icons/bs';
 import { useNavigate } from "react-router-dom";
 import {createPost} from "../../redux/features/postSlice"
import {useSelector, useDispatch} from "react-redux";
import {
    deletePost,
    getPost,
    setEdit,
    updatePost,
  } from "../../redux/features/postSlice"; 


const TaskInput = () => {

    const [values, setValues] = useState({task_msg: "", task_date: "", task_time: ""});
    const { post, loading } = useSelector((state) => ({ ...state.app }));
  const [showPost, setShowPost] = useState(false);
  const { task_msg, task_date, task_time, assigned_user } = values;
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const handleSubmit = (e) => {
       e.preventDefault();
       dispatch(createPost({ values }));
       setValues({task_msg: "", task_date: "", task_time: "", assigned_user: ""})
       setShowPost(true);
    }

    const showPostBlog = () => {
        return (
          <>
          {loading ? (
            <h2>Loading...</h2>
        ) : (
          <div className="guide">
            <div className="guide-left">
             {/* <p>User Id: {post[0].id}</p> */}
              <span>{post[0].task_msg}</span>
              <span>{post[0].task_date}</span>
              <span>{post[0].task_time}</span>
              <span>{post[0].assigned_user}</span>
            </div>
            <div className="guide-right">
             <GrFormEdit 
             onClick={() => dispatch(setEdit({ edit: true, body: post[0].body }))}
             className="iconed"/>
             <MdOutlineDelete 
             onClick={() => dispatch(deletePost({ id: post[0].id }))}
             className="iconed"/>
            </div>
          </div>
        )}
          </>
          );
        };

    return (
    <div className='taskInput'>
    <div className='container'>
    <div className='right'>
    <div className='right-top'>
    <p className='task-top'>TASKS 0 <GrFormAdd className="icons"/> </p>
    </div>   
    <form className='register-form' onSubmit={handleSubmit}>
        <label>Task Description</label>
        <div className="input-icon">
        <input type="text" 
        placeholder="Follow Up" 
        onChange={(e) => setValues({...values, task_msg: e.target.value })} 
        value={task_msg} 
        /> 
        <BsFilterSquare className="icon"/>
        </div>
        <div className="datetime">
        <div>
        <label>Date</label>
        <div>
        <input type="date"
        onChange={(e) => setValues({...values, task_date: e.target.value })} 
        value={task_date}
        /> 
        </div>
        </div>
        <div>
        <label>Time</label>
        <div>
        <input type="time"  
        onChange={(e) => setValues({...values, task_time: e.target.value })} 
        value={task_time}
        /> 
        </div>
        </div>
        </div>
        <label>Assign User</label>
        <div className="input-icon">
        <input type="text" 
        placeholder="Prem Kumar"
        onChange={(e) => setValues({...values, assigned_user: e.target.value }) } 
        value={assigned_user } 
          /> 
        <TbSelector className="icon"/>
        </div>
        <div className="btned">
         <p className='btn' onClick={()=>navigate("/")} > Cancel </p> 
         <button className="btns" >
          Save
        </button>
        </div>
        </form>
        <br />
      <br />
      {showPost && <div>{showPostBlog()}</div>}
    </div>
    </div>

    

    </div>
  )
}

export default TaskInput
