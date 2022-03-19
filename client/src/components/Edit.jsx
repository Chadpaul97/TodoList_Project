import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom';
export default function Edit() {
    const [formErrors, setFormErrors] = useState({});
    let [loggedInUser, setLoggedInUser] = useState({});
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

    const onChangeHandler = (e) => {
        setLoggedInUser({
            ...loggedInUser,
            [e.target.name]: e.target.value
        })
    }

    const editUser = (e) => {
        e.preventDefault();
        axios.patch('http://localhost:8000/api/users/update/' + loggedInUser._id,
            loggedInUser, { withCredentials: true })
            .then(res => {
                console.log("res after registering", res)
                if (res.data.err) {
                    setFormErrors(res.data.err.errors)
                }
                else {
                    //redirect to dashboard
                    history.push('/dashboard')
                }
            })
            .catch(err => {
                console.log('err after register', err)
            })
    }
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


    return (
        <div className='p-2'>
            <div className='d-flex navbar p-2'>
                <h2>Welcome</h2>
                <button className="btn " onClick={logout}>Logout</button>
                <Link to={"/dashboard"}><button className="btn">Dashboard</button></Link>
                <button className="btn " onClick={() => deleteUser(loggedInUser._id)}>Delete</button>
            </div>
            <div className='container todoForm p-2 w-75'>
                <h1>Edit User</h1>
                <form onSubmit={editUser} className=' form-group form-bottom mt-3'>
                    <div className='d-flex justify-content-around align-items-center'>
                        <label className='mr-2'>First Name : </label>
                        <input type="text" name="firstName" className='form-control w-50' onChange={onChangeHandler} value={loggedInUser.firstName} placeholder='First Name' />
                    </div>
                    <p className="text-danger">{formErrors.firstName?.message}</p>

                    <div className='d-flex justify-content-around align-items-center mt-3'>
                        <label>Last Name :</label>
                        <input type="text" name="lastName" className='form-control w-50' onChange={onChangeHandler} value={loggedInUser.lastName} placeholder='Last Name' />
                    </div>
                    <p className="text-danger">{formErrors.lastName?.message}</p>


                    <div className='d-flex justify-content-around align-items-center mt-3'>
                        <label>Email Address:</label>
                        <input type="text" name="email" className='form-control w-50' onChange={onChangeHandler} value={loggedInUser.email} placeholder='Email' />
                    </div>
                    <p className="text-danger">{formErrors.email?.message}</p>

                    <input type="submit" value="Submit" className='btn btn-success mt-3' />
                </form>
            </div>

        </div>
    )
}