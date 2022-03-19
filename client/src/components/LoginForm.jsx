import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'

export default function LoginForm() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loginErrors, setLoginErrors] = useState();
    const history = useHistory();

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/login", form, { withCredentials: true })
            .then(res => {
                console.log("res after Login", res)
                if (res.data.error) {
                    setLoginErrors(res.data.error)
                }
                else {
                    //redirect to dashboard
                    history.push('/dashboard')
                }
            })
            .catch(err => {
                console.log('err after regist', err)
            })
    }

    return (
        <div>
            <div className='form-top container d-flex justify-content-between p-0'>
                <div className='form-top-left '>
                    <h3>Login to our site</h3>
                    <p>Enter email and password to login</p>
                </div>
                <div className='form-top-right'>
                    <span>🔒</span>
                </div>
            </div>
            <div className='form-bottom'>
                <form className='form-group' onSubmit={login}>
                    <div>
                        <input type="text" name="email" className='form-control' onChange={onChangeHandler} value={form.email} placeholder='Email' /><br />
                    </div>
                    <div>
                        <input type="password" name="password" className='form-control' onChange={onChangeHandler} value={form.password} placeholder='Password' />
                    </div>
                    <p className="text-danger">{loginErrors}</p>
                    <input type="submit" value="Login" className='btn btn-primary m-1' />
                </form>
            </div>

        </div>
    )
}
