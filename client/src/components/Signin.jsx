import React from 'react'
import RegistrationForm from './RegistrationForm'
import LoginForm from './LoginForm'
export default function Signin() {
    return (
        <div>
            <div className='container'>
                <div className="row">
                    <div className="col-sm-5">
                        <LoginForm />
                    </div>
                    <div className="col-sm-1 middle-border"></div>
                    <div className="col-sm-1"></div>
                    <div className="col-sm-5">
                        <RegistrationForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
