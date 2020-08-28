import React from 'react'

export default function Signup(props) {
    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={props.onSignup}>
                <input name="username" type="text" placeholder="Username"/>
                <input name="email" type="email" placeholder="Email"/>
                <input name="password" type="text" placeholder="Password"/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}