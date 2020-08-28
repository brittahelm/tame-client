import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <h1>tame</h1>
            <h3>Manage your migraines</h3>
            <Button variant="outline-dark"><Link to="/login">Log In</Link></Button>
            <Button variant="outline-dark"><Link to="/signup">Sign Up</Link></Button>    
        </div>
    )
}
