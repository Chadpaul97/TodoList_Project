import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useHistory, useParams } from 'react-router-dom';
export default function EditTodo() {
    const { _id } = useParams();
    const [formErrors, setFormErrors] = useState({});
    const [loggedInUser, setLoggedInUser] = useState({});
    let [userTodo, setUserTodo] = useState({});
    const history = useHistory();

    //Gathers users info
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/getloggedinuser", { withCredentials: true })
            .then(res => {
                console.log("res of logged in user", res)
                if (res.data.results) {
                    // this means user is logged in, and can access the page
                    setLoggedInUser(res.data.results)
                }
            })
            .catch(err => console.log('err  of logged in user', err))
    }, [])

    useEffect(() => {
        console.log(_id)
        axios.get("http://localhost:8000/api/users/getUserTodos/" + _id, { withCredentials: true })
            .then(res => {
                console.log("res of todo item", res)
                if (res.data) {
                    setUserTodo(res.data)
                }
            })
            .catch(err => console.log('err  of todo', err))
    }, [_id])
    const logout = () => {
        axios.get('http://localhost:8000/api/users/logout/', { withCredentials: true })
            .then(res => {
                history.push("/")
            })
            .catch(err => {
                console.log("err deleting user", err)
            })
    }

    const deleteUser = (userId) => {
        axios.delete('http://localhost:8000/api/users/delete/' + userId, { withCredentials: true })
            .then(res => {
                history.push("/")
            })
            .catch(err => {
                console.log("err logging out", err)
            })
    }


    const editUser = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/users/updateATodo/' + _id,
            userTodo, { withCredentials: true })
            .then(res => {
                if (res.data.err) {
                    setFormErrors(res.data.err.errors)
                    // console.log(formErrors.todos."0".title.message)
                }
                else {
                    history.push('/dashboard')
                }
                console.log("res after adding todo", res)
            })
            .catch(err => {
                // let toDoError = err.errors.todos.errors
                // setFormErrors(toDoError)
                console.log('err adding todo', err)
            })
    }

    const onChangeHandler = (e) => {
        setUserTodo({
            ...userTodo,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <div className='d-flex navbar p-2'>
                <h2>Welcome {loggedInUser.firstName}</h2>
                <button className="btn " onClick={logout}>Logout</button>
                <Link to={"/edit"}><button className="btn">Edit</button></Link>
                <button className="btn " onClick={() => deleteUser(loggedInUser._id)}>Delete</button>
            </div>
            <form onSubmit={editUser} className='todoForm container mb-3 p-3 w-50 mt-5'>
                <h5>Edit Todo</h5>
                <label >Title : </label>
                <input type="text" placeholder='Title' name='title' className='container' onChange={onChangeHandler} value={userTodo.title} />
                <p className="text-danger">{formErrors.title?.message}</p>
                <label >Note : </label>
                <input type="text" placeholder='Note' name='note' className='container' onChange={onChangeHandler} value={userTodo.note} />
                <p className="text-danger">{formErrors.note?.message}</p>
                <button type='submit' className='addTodo '>Submit</button>
            </form>
        </div>
    )
}