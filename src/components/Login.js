import React from 'react'

export default function Login(props) {
    return (
        <div>
            <h2>Log In</h2>
            <form onSubmit={props.onLogin}>
                <input name="email" type="email" placeholder="Email"/>
                <input name="password" type="text" placeholder="Password"/>
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}
