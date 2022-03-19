import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
export default function RegistrationForm() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [formErrors, setFormErrors] = useState({});
    const history = useHistory();

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const register = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/register", form, { withCredentials: true })
            .then(res => {
                console.log("res after registering", res)
                if (res.data.errors) {
                    setFormErrors(res.data.errors)
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

    return (
        <div >
            <div className='form-top container d-flex justify-content-between p-0'>
                <div className='form-top-left'>
                    <h3>Sign up now</h3>
                    <p>Fill in the information to get instant access</p>
                </div>
                <div className='form-top-right'>
                    <span>📝</span>
                </div>
            </div>


            <form onSubmit={register} className='form-bottom'>
                <div>
                    <input type="text" name="firstName" className='form-control' onChange={onChangeHandler} value={form.firstName} placeholder='First Name' />
                    <p className="text-danger">{formErrors.firstName?.message}</p>
                </div>
                <div>
                    <input type="text" name="lastName" className='form-control' onChange={onChangeHandler} value={form.lastName} placeholder='Last Name' />
                    <p className="text-danger">{formErrors.lastName?.message}</p>
                </div>
                <div>
                    <input type="text" name="email" className='form-control' onChange={onChangeHandler} value={form.email} placeholder='Email' />
                    <p className="text-danger">{formErrors.email?.message}</p>
                </div>
                <div>
                    <input type="password" name="password" className='form-control' onChange={onChangeHandler} value={form.password} placeholder='Password' />
                    <p className="text-danger">{formErrors.password?.message}</p>
                </div>
                <div>
                    <input type="password" name="confirmPassword" className='form-control' onChange={onChangeHandler} value={form.confirmPassword} placeholder='Confirm Password' />
                    <p className="text-danger">{formErrors.confirmPassword?.message}</p>
                </div>
                <input type="submit" value="Submit" className='btn btn-success m-1' />
            </form>
        </div>
    )
}
