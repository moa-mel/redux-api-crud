import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const getPost = createAsyncThunk("post/getPost",
 async ({id}) => {
  const response =  await axios.post(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_413ef22b6237417fb1fba7917f0f69e7`,
    {
      method: "POST",
      headers: {
        'Authorization':  `Bearer ${process.env.SLOOVI_LOGIN_TOKEN}`,
        "Accept": "application/json",
        "Content-type": "application/json",
      },
    body: {},
  }) 
  return response.data;  
});

export const deletePost = createAsyncThunk(
    "post/deletePost",
    async ({id} ) => {
      const response =  await axios.delete(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_413ef22b6237417fb1fba7917f0f69e7`, 
       {
        method: "DELETE",
    })
    return response.data;
    })
  
  export const createPost = createAsyncThunk(
    "post/createPost",
    async ({values}) => {
      const response = await axios.post(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_413ef22b6237417fb1fba7917f0f69e7`, 
        {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${process.env.SLOOVI_LOGIN_TOKEN}`,
            "Accept": "application/json",
            "Content-type": "application/json",
          },
          body: {
            assigned_user: values.assigned_user, 
            task_date: values.task_date,
            task_time: values.task_time,
            task_msg: values.task_msg, 
          },
      })
      return response.data;
    });
  
  export const updatePost = createAsyncThunk(
    "post/updatePost",
    async ({id, assigned_user, task_date, task_time, task_msg}) => {
        const response = await axios.put(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_413ef22b6237417fb1fba7917f0f69e7`, 
       {
        method: "PUT",
      headers: {
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
        "Accept": "application/json",
        "Content-type": "application/json",
      },
      body: {
        assigned_user,
        task_date,
        task_time,
        task_msg,
      },
    })
    return response.data;
    });

const postSlice = createSlice({
    name: "post",
    initialState: {
        post: [],
        loading: false, 
        error: null, 
        task_msg: "",
        edit: false,
    },
    reducers: {
        setEdit: (state, action) => {
          state.edit = action.payload.edit;
          state.task_msg = action.payload.task_msg;

        },
      },
    extraReducers: {
        [getPost.pending]: (state, action) => {
            state.loading = true;
        },
        [getPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = [action.payload];
        },
        [getPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
        ,
    [deletePost.pending]: (state, action) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = action.payload;
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createPost.pending]: (state, action) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updatePost.pending]: (state, action) => {
      state.loading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
    },
    [updatePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    }
})

export const { setEdit } = postSlice.actions;

export default postSlice.reducer