import React from 'react'

export default function Login(props) {
    return (
        <div className="auth-screen">
            <h2>Log In</h2>
            <form className="auth-form" onSubmit={props.onLogin}>
                <input name="email" type="email" placeholder="Email"/>
                <input name="password" type="text" placeholder="Password"/>
                <button className="button" type="submit">Log In</button>
            </form>
            {props.errorMessage && <p className="auth-error">{props.errorMessage}</p>}
        </div>
    )
}
