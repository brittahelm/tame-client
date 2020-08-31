import React from 'react'

export default function Signup(props) {
    
    return (
        <div className="auth-screen">
            <h2>Sign Up</h2>
            <form className="auth-form" onSubmit={props.onSignup}>
                <input name="username" type="text" placeholder="Username"/>
                <input name="email" type="email" placeholder="Email"/>
                <input name="password" type="text" placeholder="Password"/>
                <button className="button" type="submit">Sign Up</button>
            </form>
            {props.errorMessage && <p className="auth-error">{props.errorMessage}</p>}
        </div>
    )
}