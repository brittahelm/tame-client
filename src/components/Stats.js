import React from 'react'
import Nav from './Nav'
import { Button } from 'bootstrap-react'
import { Link } from 'react-router-dom'

export default function Stats() {
    return (
        <div>
            <Nav/>
            <h2>Stats</h2>
            <Link to="/migraines/history"><Button>History</Button></Link>
        </div>
    )
}
