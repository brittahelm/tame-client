import React from 'react';
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="start-screen">
            <img className="hedgehog-logo" src="https://res.cloudinary.com/deravtpot/image/upload/v1598883877/hedgehog-4819833_1920_darhfd.png" alt=""/>
            <h1>tame</h1>
            <h3>Manage your migraines</h3>
            <button className="button"><Link to="/login">Log In</Link></button>
            <button className="button"><Link to="/signup">Sign Up</Link></button>  
            <div className="start-about-box">
            <article className="start-about-info">
                <h4>About tame</h4>
                <p>Living with migraines isn't easy - but don't let them take over your life. Keep track of your symptoms, triggers and the remedies that work for you with tame. Sign up for free to get started or log in as testuser@testuser.com (password: test@123) if you're just here for the code.</p> 
            </article> 
            </div>
        </div>
    )
}
